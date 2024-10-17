import React from 'react';
import ppp from "../Images/profile-pic.png"
import {TypeAnimation } from "react-type-animation"
import { useNavigate } from 'react-router-dom';

export default function Home() {

  const navigate = useNavigate() ; 

  const handleExternalLink = (url) => {
    window.open(url, '_blank');
  };

  return (
    <>
    <div
      className=" animate-float  h-screen bg-cover bg-center grid grid-cols-1 lg:grid-cols-12 items-center justify-center text-center px-4 bg-gradient-to-r from-gray-200 via-white to-gray-50"
    >
      <div className="col-span-1 lg:col-span-8 mt-24 sm:m-6">

      <h1 className="text-slate-500  h-[150px] text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-center">
        Welcome to{' '}
        <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-violet-700 bg-clip-text text-transparent text-4xl md:text-5xl lg:text-6xl">
          <TypeAnimation
            sequence={[
              "HealthAI", 5000, 
              "" , 1000 ,
              "Your HealthCare Companion", 5000 ,
              "" , 1000 
            ]}
            wrapper="span"
            speed={10} 
            repeat={Infinity} 
          />
        </span>
      </h1>

        <p className="text-center md:text-lg lg:text-xl text-gray-500 font-bold px-4 md:px-8 lg:px-12">
          Find doctors, get general health recommendations, and stay healthy with our AI-powered platform.
        </p>
        
        <div className="flex items-center gap-2 mt-8 lg:flex-row lg:gap-4 justify-center">


        <button
          onClick={() => handleExternalLink('https://healthymistry-healthassistant.streamlit.app/')}
          className="rounded-lg bg-gradient-to-tr from-pink-300 via-purple-400 to-violet-700 p-3 m-2 text-white text-sm md:text-base font-semibold transition hover:from-violet-700 hover:to-pink-300 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2 w-40 lg:w-44"
        >
          Predict Disease
        </button>

        <button
          onClick={() => handleExternalLink('https://brainology-analyzer.streamlit.app/')}
          className="rounded-lg bg-gradient-to-r from-purple-400 via-violet-500 to-violet-700 p-3 m-2 text-white text-sm md:text-base font-semibold transition hover:from-violet-700 hover:to-purple-400 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2 w-40 lg:w-44"
        >
          Analyze MRI
        </button>

        <button
          onClick={() => handleExternalLink('https://health-xrayanalysis.streamlit.app/')}
          className="rounded-lg bg-gradient-to-br from-pink-300 via-purple-500 to-violet-700 p-3 m-2 text-white text-sm md:text-base font-semibold transition hover:from-violet-700 hover:to-pink-300 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2 w-40 lg:w-44"
        >
          Analyze XRay
        </button>

        </div>
      </div>

      <img src={ppp} alt="Health AI" className=" w-[60%] sm:w-[90%]  h-[300px] sm:h-[600px]  col-span-1 lg:col-span-4 rounded-[40%] mx-auto" />
    </div>
    

    </>
    
  );
}
