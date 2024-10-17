import React, { useCallback, useMemo, useState, useEffect } from 'react';
import { useAuth } from "../Context/AuthContext";
import ReactPlayer from 'react-player'
import Peer from "../Services/Peer"
import { useSocket } from '../Context/SocketProvider'
import { useParams } from 'react-router-dom';

export default function VideoCall() {

  const { currentUser } = useAuth();
  
  const [remoteSocketId, setRemoteSocketId] = useState(null);
  const [stream, setStream] = useState(null);
  const [remoteStream, setRemoteStream] = useState(null);

  const socket = useSocket();

  const {room} = useParams();

  const handleUserJoined = useCallback(({ uid, id }) => {
    if (id !== socket.id) {
      console.log(`${uid} joined the room, setting remoteSocketId`);
      setRemoteSocketId(id);
    } else {
      console.log("You have joined the room");
    }
  }, [socket.id]);

  const handleCall = useCallback(
    async () => {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: true,
      });
      const offer = await Peer.getOffer();
      socket.emit("user:call", { to: remoteSocketId, offer });
      setStream(stream);
    },
    [remoteSocketId, socket]
  );

  const handleIncomingCall = useCallback(
    async ({ from, offer }) => {
      setRemoteSocketId(from);
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: true,
      });
      setStream(stream);
      console.log("Incoming call", offer);
      const ans = await Peer.getAnswer(offer);
      socket.emit("call:accepted", { to: from, ans });
    },
    [socket]
  );

  const sendStreams = useCallback(() => {
    for (const track of stream.getTracks()) {
      console.log(track);
      Peer.peer.addTrack(track, stream);
    }
  }, [stream]);

  const handleCallAccepted = useCallback(
    ({ from, ans }) => {
      Peer.setLocalDescription(ans);
      console.log("Call Accepted!");
      sendStreams();
    },
    [sendStreams]
  );

  const handleEndCall = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }

    if (remoteStream) {
      remoteStream.getTracks().forEach(track => track.stop());
      setRemoteStream(null);
    }

    socket.emit("room:leave", {
      uid: currentUser.uid,
      room: room
    });

    Peer.peer.close();
    Peer.peer = null;
  };

  const handleNegoNeeded = useCallback(
    async () => {
      const offer = await Peer.getOffer();
      socket.emit("peer:nego:needed", { offer, to: remoteSocketId });
    },
    [remoteSocketId, socket]
  );

  const handleNegoNeedIncoming = useCallback(
    async ({ from, offer }) => {
      const ans = await Peer.getAnswer(offer);
      socket.emit("peer:nego:done", { to: from, ans });
    },
    [socket]
  );

  const handleNegoNeedFinal = useCallback(
    async ({ ans }) => {
      await Peer.setLocalDescription(ans);
    },
    []
  );

  useEffect(() => {
    if (currentUser && room) {
      socket.emit("room:join", {
        uid: currentUser.uid,
        roomId: room
      });
    }
  }, [currentUser, room, socket]);

  useEffect(() => {
    socket.on("user:joined", handleUserJoined);
    socket.on("incoming:call", handleIncomingCall);
    socket.on("call:accepted", handleCallAccepted);
    socket.on("peer:nego:needed", handleNegoNeedIncoming);
    socket.on("peer:nego:final", handleNegoNeedFinal);

    return () => {
      socket.off("user:joined", handleUserJoined);
      socket.off("incoming:call", handleIncomingCall);
      socket.off("call:accepted", handleCallAccepted);
      socket.off("peer:nego:needed", handleNegoNeedIncoming);
      socket.off("peer:nego:final", handleNegoNeedFinal);
    };
  }, [socket, handleUserJoined, handleIncomingCall, handleCallAccepted, handleNegoNeedIncoming, handleNegoNeedFinal]);

  useEffect(() => {
    Peer.peer.addEventListener('negotiationneeded', handleNegoNeeded);
    return () => {
      Peer.peer.removeEventListener('negotiationneeded', handleNegoNeeded);
    };
  }, [handleNegoNeeded]);

  useEffect(() => {
    Peer.peer.addEventListener("track", ev => {
      const remoteStream = ev.streams;
      setRemoteStream(remoteStream[0]);
    });
  }, []);

  return (
    <div className="bg-gradient-to-r from-violet-300 via-white to-violet-300 h-screen">
      <div className="flex h-[80%] pt-32 px-4">
        <ReactPlayer
          playing
          url={stream}
          width="100%"
          height="90%"
          style={{
            borderRadius: "0.5rem",
            overflow: "hidden",
            border: "1px solid #9B59B6",
            boxShadow: "0 10px 15px rgba(155, 89, 182, 0.3)",
            width: "100%",
          }}
        />
        <ReactPlayer
          playing
          url={remoteStream}
          width="100%"
          height="90%"
          style={{
            borderRadius: "0.5rem",
            overflow: "hidden",
            border: "1px solid #9B59B6",
            boxShadow: "0 10px 15px rgba(155, 89, 182, 0.3)",
            width: "100%",
          }}
        />
      </div>
      <h4>{remoteSocketId?remoteSocketId: "No one in room"}</h4>

      {!stream && (
        <button
          className="p-4 mt-2 bg-gradient-to-tr from-pink-300 via-purple-400 to-violet-700 m-2 text-sm md:text-base font-semibold transition hover:from-violet-700 hover:to-pink-300 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2  w-full text-white rounded-xl"
          onClick={handleCall}
        >
          Make Call
        </button>
      )}
      {
        remoteSocketId && 
        <button
          className="p-4 mt-2 bg-gradient-to-tr  from-pink-300 via-purple-400 to-violet-700 m-2 text-sm md:text-base font-semibold transition hover:from-violet-700 hover:to-pink-300 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2 w-full text-white rounded-xl"
          onClick={handleCallAccepted}
        >
          Accept Call
        </button>
      }
      {stream && <button
        className="p-4 mt-2 bg-gradient-to-tr from-pink-300 via-purple-400 to-violet-700 m-2 text-sm md:text-base font-semibold transition hover:from-violet-700 hover:to-pink-300 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2 w-full text-white rounded-xl"
        onClick={handleEndCall}
      >
        End Call
      </button>}
    </div>
  );
}