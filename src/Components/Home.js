import React from 'react';
import background from '../Images/Home1.png'; 
import './Animations.css';
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div
      className="h-screen bg-cover bg-center flex flex-col items-center justify-center text-center px-4"
      style={{ 
        backgroundImage: `url(${background})`,
        paddingTop: '4rem'
      }}
    >
      <div className="animate-float">
        <h1 className="text-slate-500 text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
          Welcome to <span className="text-violet-500 text-4xl md:text-5xl lg:text-6xl">Health AI</span>
        </h1>
        <p className="text-base md:text-lg lg:text-xl text-gray-400 font-bold max-w-3xl px-4 md:px-8 lg:px-12">
          Find doctors, get general health recommendations, and stay healthy with our AI-powered platform.
        </p>
        <div className="mx-auto mt-8 space-x-4">
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
        </div>
      </div>
    </div>
  );
}
