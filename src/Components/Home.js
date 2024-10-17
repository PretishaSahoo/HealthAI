import React from 'react';
import ppp from "../Images/profile-pic.png"
import {TypeAnimation } from "react-type-animation"

export default function Home() {
  return (
    <div
      className=" animate-float h-screen bg-cover bg-center grid grid-cols-1 lg:grid-cols-12 items-center justify-center text-center px-4 bg-gradient-to-r from-gray-200 via-white to-gray-50"
    >
      <div className="col-span-1 lg:col-span-8 ">

      <h1 className="text-slate-500 text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-center">
        Welcome to{' '}
        <span className="text-violet-500 text-4xl md:text-5xl lg:text-6xl">
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


          <a
            href="https://healthymistry-healthassistant.streamlit.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg bg-violet-500 p-2 m-1 text-white transition hover:bg-violet-700 focus:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-violet-700 focus:ring-offset-2 w-32 text-center"
          >
            Predict Disease
          </a>
          <a
            href="https://brainology-analyzer.streamlit.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg bg-violet-500 p-2 m-1 text-white transition hover:bg-violet-700 focus:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-violet-700 focus:ring-offset-2 w-32 text-center"
          >
            Analyze MRI
          </a>
          <a
            href="https://health-xrayanalysis.streamlit.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg bg-violet-500 p-2 m-1 text-white transition hover:bg-violet-700 focus:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-violet-700 focus:ring-offset-2 w-32 text-center"
          >
            Analyse XRay 
          </a>

        </div>
      </div>

      <img src={ppp} alt="Health AI" className=" w-[60%] sm:w-[90%]  h-[300px] sm:h-[600px]  col-span-1 lg:col-span-4 rounded-[40%] mx-auto" />


    </div>
  );
}
