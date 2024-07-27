import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <header className="text-gray-50 fixed top-0 left-0 right-0 w-full z-10 bg-opacity-90 backdrop-filter backdrop-blur-lg shadow-lg mx-auto flex flex-col overflow-hidden px-4 py-4 lg:flex-row lg:items-center bg-transparent">
      <Link to="/" className="flex items-center whitespace-nowrap text-2xl bg-transparent">
        <p className='text-violet-500 p-2 m-2 bg-transparent font-bold'>HealthAI</p>
      </Link>
      <input type="checkbox" className="peer hidden" id="navbar-open" />
      <label className="absolute top-5 right-5 cursor-pointer lg:hidden" htmlFor="navbar-open">
        <svg className="h-7 w-7" xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24" stroke="grey">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </label>
      <nav aria-label="Header Navigation" className="p-2 peer-checked:pt-8 peer-checked:max-h-60 flex max-h-0 w-full flex-col items-center overflow-hidden transition-all lg:ml-24 lg:max-h-full lg:flex-row bg-transparent">
        <ul className="flex w-full flex-col items-center space-y-2 lg:flex-row lg:justify-center lg:space-y-0 lg:space-x-12 bg-transparent">
          <li className="lg:mr-12 bg-transparent">
            <Link className="rounded-xl bg-transparent p-2 text-violet-300 transition hover:bg-violet-700 focus:bg-violet-700 focus:outline-none focus:ring-offset-2" to="/about">About</Link>
          </li>
          <li className="lg:mr-12 bg-transparent">
            <Link className="rounded-xl bg-transparent p-2 text-violet-300 transition hover:bg-violet-700 focus:bg-violet-700 focus:outline-none focus:ring-offset-2" to="/healthchat">Health Chat</Link>
          </li>
          <li className="lg:mr-12 bg-transparent">
            <Link className="rounded-xl bg-transparent p-2 text-violet-300 transition hover:bg-violet-700 focus:bg-violet-700 focus:outline-none focus:ring-offset-2" to="/team">Team</Link>
          </li>
          <li className="lg:mr-12 bg-transparent">
            <Link className="rounded-xl bg-transparent p-2 text-violet-300 transition hover:bg-violet-700 focus:bg-violet-700 focus:outline-none focus:ring-offset-2" to="/contact">Contact</Link>
          </li>
        </ul>
        <hr className="mt-4 w-full lg:hidden" />
        <Link to="/join" className="mt-4 lg:mt-0 lg:ml-auto rounded-lg bg-violet-500 p-2 text-white transition hover:bg-violet-700 focus:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-violet-700 focus:ring-offset-2 w-32 text-center">
          Join Now
        </Link>
      </nav>
    </header>
  );
}
