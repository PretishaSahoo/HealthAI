import React, { useCallback, useMemo, useState, useEffect, useRef } from 'react';
import { io } from 'socket.io-client';
import { useAuth } from "../Context/AuthContext";

const baseURL = process.env.REACT_APP_MODE === "production" ? "https://health-ai-backend.vercel.app" : "http://localhost:5000";

export default function VideoCall() {
  const { currentUser } = useAuth();
  const [isJoined, setIsJoined] = useState(false);
  const [error, setError] = useState(null);
  const [localStream, setLocalStream] = useState(null);
  const [remoteStream, setRemoteStream] = useState(null);
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const peerConnection = useRef(null);
  const socket = useMemo(() => io(baseURL), [baseURL]);

  const queryParams = new URLSearchParams(window.location.search);
  const doctorUid = queryParams.get('doctorUid');
  const userUid = queryParams.get('userUid');
  const videoCallLink = queryParams.get('videoCallLink');

  useEffect(() => {
    socket.on("user-joined", ({ id, role }) => {
      console.log(`${role} has joined the call.`);
      setIsJoined(true);
    });

    socket.on("user-left", () => {
      setIsJoined(false);
      closeConnection();
    });

    socket.on("signal", async (data) => {
      if (data.type === "offer") {
        await peerConnection.current.setRemoteDescription(new RTCSessionDescription(data));
        const answer = await peerConnection.current.createAnswer();
        await peerConnection.current.setLocalDescription(answer);
        socket.emit("signal", peerConnection.current.localDescription);
      } else if (data.type === "answer") {
        await peerConnection.current.setRemoteDescription(new RTCSessionDescription(data));
      } else if (data.candidate) {
        await peerConnection.current.addIceCandidate(new RTCIceCandidate(data));
      }
    });

    return () => {
      socket.off("user-joined");
      socket.off("user-left");
      socket.off("signal");
    };
  }, [socket]);

  const handleJoinRoom = useCallback(async () => {
    const role = currentUser?.isDoctor ? 'doctor' : 'user';
    const uid = currentUser?.uid;

    try {
      socket.emit("join", { uid, doctorUid, userUid, role, room: videoCallLink });

 
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      setLocalStream(stream);
      localVideoRef.current.srcObject = stream;

      peerConnection.current = new RTCPeerConnection({
        iceServers: [
          { urls: "stun:stun.l.google.com:19302" },
          { urls: "stun:global.stun.twilio.com:3478" }
        ]
      });

      stream.getTracks().forEach(track => {
        peerConnection.current.addTrack(track, stream);
      });

      peerConnection.current.ontrack = (event) => {
        remoteVideoRef.current.srcObject = event.streams[0];
        setRemoteStream(event.streams[0]);
      };

      peerConnection.current.onicecandidate = (event) => {
        if (event.candidate) {
          socket.emit("signal", event.candidate);
        }
      };

      const offer = await peerConnection.current.createOffer();
      await peerConnection.current.setLocalDescription(offer);
      socket.emit("signal", offer);

      setIsJoined(true);
    } catch (err) {
      setError("Unable to access camera and microphone: " + err.message);
    }
  }, [videoCallLink, currentUser, doctorUid, userUid, socket]);

  const handleLeaveRoom = useCallback(() => {
    if (localStream) {
      localStream.getTracks().forEach(track => track.stop());
    }
    if (localVideoRef.current) {
      localVideoRef.current.srcObject = null;
    }
    if (remoteVideoRef.current) {
      remoteVideoRef.current.srcObject = null;
    }

    socket.emit("leave", { room: videoCallLink });
    closeConnection();
    setIsJoined(false);
  }, [localStream, socket, videoCallLink]);

  const closeConnection = () => {
    if (peerConnection.current) {
      peerConnection.current.close();
      peerConnection.current = null;
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white p-4 mt-24">
      {error && <p className="text-red-600">{error}</p>}
      {!isJoined ? (
        <button onClick={handleJoinRoom} className="px-6 py-3 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition duration-200">
          Join Call
        </button>
      ) : (
        <div className="w-full flex flex-col md:flex-row gap-4 md:gap-6 lg:gap-8">
          <div className="flex-1 bg-gray-200 rounded-lg overflow-hidden h-72 md:h-96">
            <video ref={localVideoRef} autoPlay muted className="w-full h-full object-cover"></video>
          </div>
          <div className="flex-1 bg-gray-200 rounded-lg overflow-hidden h-72 md:h-96">
            <video ref={remoteVideoRef} autoPlay className="w-full h-full object-cover"></video>
          </div>
        </div>
      )}
      {isJoined && (
        <button onClick={handleLeaveRoom} className="px-4 py-2 bg-violet-600 text-white rounded-md hover:bg-violet-700 transition duration-200 mt-4">
          End Call
        </button>
      )}
    </div>
  );
}
