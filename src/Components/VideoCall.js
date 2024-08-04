import React ,{useMemo} from 'react'
import {io} from "socket-io-client";

const baseURL = process.env.REACT_APP_MODE === "production" ? "https://health-ai-backend.vercel.app" : "http://localhost:5000";


export default function VideoCall() {

 const socket = useMemo(()=>io(baseURL,[]));
 
  return (
    <></>
  )
}
