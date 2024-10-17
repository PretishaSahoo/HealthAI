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
            <div className="bg-gradient-to-r from-violet-300 via-white to-violet-300 h-screen w-full flex justify-center items-center">
                <h2 className="text-violet-800 text-2xl">Loading...</h2>
            </div>
        );
    }

    return (
        <div className="bg-gradient-to-t from-violet-300 via-white to-violet-300 h-screen w-full pt-24">

            <form className="flex flex-col items-center w-[90%] sm:w-[40%] mx-auto p-6 m-6 mt-32 border border-violet-300 rounded-xl">
                <label htmlFor="room" className="sr-only">Room Code</label>
                <input value={room} type="text" className="rounded-xl mb-2 p-4 w-full bg-violet-100 border border-violet-300 text-center" placeholder="Enter room code" readOnly />
                <button onClick={handleSubmit} className="p-4 mt-2 text-center rounded-lg bg-gradient-to-tr from-pink-300 via-purple-400 to-violet-700 m-2 text-sm md:text-base font-semibold transition hover:from-violet-700 hover:to-pink-300 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2 w-full text-white rounded-xl">Join</button>
            </form>
        </div>
    );
}
