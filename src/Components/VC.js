import React, { useRef, useEffect } from 'react';
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import { useAuth } from "../Context/AuthContext";

export default function VC() {
  const { currentUser } = useAuth();
  const callContainerRef = useRef(null);

  const queryParams = new URLSearchParams(window.location.search);
  const videoCallLink = queryParams.get('videoCallLink');

  useEffect(() => {
    const myCall = async () => {
      if (callContainerRef.current) {
        const appId = 453893021;
        const serverSecret = "1b0e8ca7a2ca58cbb8219863b5b7e010";
        const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(appId, serverSecret, videoCallLink, currentUser?.uid, currentUser?.name);
        const zc = ZegoUIKitPrebuilt.create(kitToken);
        zc.joinRoom({
          container: callContainerRef.current,
          scenario: {
            mode: ZegoUIKitPrebuilt.OneONoneCall,
          },
        });
      }
    };

    myCall();
  }, [currentUser, videoCallLink]);

  return (
    <div className="mt-24 h-screen bg-transparent flex justify-center items-center">
      <div ref={callContainerRef} className="w-full h-full max-w-full max-h-full" />
    </div>
  );
}
