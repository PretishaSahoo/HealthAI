import React, { useCallback, useState, useEffect } from 'react';
import { useSocket } from '../Context/SocketProvider';
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from '../Context/AuthContext';

export default function Lobby() {
    const { currentUser } = useAuth();
    const { room } = useParams(); 
    const navigate = useNavigate();
    const socket = useSocket();
    const [loading, setLoading] = useState(true); 

    useEffect(() => {
        if (currentUser) {
            setLoading(false); 
        }
    }, [currentUser]);

    const handleSubmit = useCallback((e) => {
        e.preventDefault();
        socket.emit('room:join', { uid: currentUser.uid, roomId: room });
    }, [currentUser, room, socket]);

    const handleRoomJoin = useCallback(
        () => {
            navigate(`/vdo/${room}/room`);
        },
        [navigate],
    );

    useEffect(() => {
        socket.on('room:join', handleRoomJoin);
        return () => {
            socket.off('room:join', handleRoomJoin);
        };
    }, [socket, handleRoomJoin]);


    if (loading) {
        return (
            <div className="bg-gradient-to-r from-violet-500 via-violet-200 to-violet-400 h-screen w-full flex justify-center items-center">
                <h2 className="text-violet-800 text-2xl">Loading...</h2>
            </div>
        );
    }

    return (
        <div className="bg-gradient-to-r from-violet-500 via-violet-200 to-violet-400 h-screen w-full pt-24">

            <form className="flex flex-col items-center w-[90%] sm:w-[40%] mx-auto p-6 m-6 mt-32 border border-violet-50 rounded-xl">
                <label htmlFor="email" className="sr-only">UID</label>
                <input value={currentUser.uid} className="rounded-xl mb-2 p-4 bg-violet-100 w-full text-center" type="text" readOnly />
                <label htmlFor="room" className="sr-only">Room Code</label>
                <input value={room} type="text" className="rounded-xl mb-2 p-4 w-full bg-violet-100 text-center" placeholder="Enter room code" readOnly />
                <button onClick={handleSubmit} className="p-4 mt-2 bg-gradient-to-r from-violet-900 to-violet-200 w-full text-white rounded-xl">Join</button>
            </form>
        </div>
    );
}
