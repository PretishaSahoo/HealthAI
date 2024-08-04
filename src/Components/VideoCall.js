import React, { useCallback, useMemo, useState, useEffect, useRef } from 'react';
import { io } from 'socket.io-client';
import { useAuth } from "../Context/AuthContext";

const baseURL = process.env.REACT_APP_MODE === "production" ? "https://health-ai-backend.vercel.app" : "http://localhost:5000";

export default function VideoCall() {
  const { currentUser } = useAuth();
  const [isJoined, setIsJoined] = useState(false);
  const [error, setError] = useState(null);
  const [role, setRole] = useState(null);
  const [localStream, setLocalStream] = useState(null);
  const [remoteStream, setRemoteStream] = useState(null);

  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);

  const socket = useMemo(() => io(baseURL), [baseURL]);

  // Extract query parameters from the URL
  const queryParams = new URLSearchParams(window.location.search);
  const doctorUid = queryParams.get('doctorUid');
  const userUid = queryParams.get('userUid');
  const videoCallLink = queryParams.get('videoCallLink');

  useEffect(() => {
    socket.on("user-joined", ({ id, role }) => {
      setRole(role);
      setIsJoined(true);
    });

    socket.on("user-left", () => {
      setIsJoined(false);
      setRole(null);
    });

    socket.on("error", ({ message }) => {
      setError(message);
    });

    socket.on("stream", (stream) => {
      if (remoteVideoRef.current) {
        remoteVideoRef.current.srcObject = new MediaStream(stream);
        setRemoteStream(new MediaStream(stream));
      }
    });

    return () => {
      socket.off("user-joined");
      socket.off("user-left");
      socket.off("error");
      socket.off("stream");
    };
  }, [socket]);

  const handleJoinRoom = useCallback(() => {
    const role = currentUser?.isDoctor ? 'doctor' : 'user';
    const uid = currentUser?.uid;

    socket.emit("join", { uid, doctorUid, userUid, role, room: videoCallLink });

    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      .then(stream => {
        if (localVideoRef.current) {
          localVideoRef.current.srcObject = stream;
        }
        setLocalStream(stream);
        socket.emit("stream", stream);
      })
      .catch(error => {
        setError(`Failed to access media devices: ${error.message}`);
      });
  }, [videoCallLink, currentUser?.uid, currentUser?.isDoctor, doctorUid, userUid, socket]);

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
    setIsJoined(false);
  }, [localStream, socket, videoCallLink]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white p-4 mt-24">
      {error && <p className="text-red-600">{error}</p>}
      {!isJoined ? (
        <button
          onClick={handleJoinRoom}
          className="px-6 py-3 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition duration-200"
        >
          Join Call
        </button>
      ) : (
        <div className="w-full flex flex-col md:flex-row gap-4 md:gap-6 lg:gap-8">
          {/* Local Video */}
          <div className="flex-1 bg-gray-200 rounded-lg overflow-hidden h-72 md:h-96">
            <video
              ref={localVideoRef}
              autoPlay
              muted
              className="w-full h-full object-cover"
            ></video>
          </div>

          {/* Remote Video */}
          <div className="flex-1 bg-gray-200 rounded-lg overflow-hidden h-72 md:h-96">
            <video
              ref={remoteVideoRef}
              autoPlay
              className="w-full h-full object-cover"
            ></video>
          </div>
        </div>
      )}
      {isJoined && (
        <button
          onClick={handleLeaveRoom}
          className="px-4 py-2 bg-violet-600 text-white rounded-md hover:bg-violet-700 transition duration-200 mt-4"
        >
          End Call
        </button>
      )}
    </div>
  );
}
