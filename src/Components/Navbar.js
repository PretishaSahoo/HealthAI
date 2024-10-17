import { useAuth } from "../Context/AuthContext";
import React, { useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Navbar() {
  const { loginWithGoogle, logout, isLoggedIn, currentUser } = useAuth();
  const navigate = useNavigate();
  const checkboxRef = useRef(null);

  const handleLogin = async () => {
    await loginWithGoogle();
    navigate("/dashboard");
  };

  const LogMeOut = async () => {
    await logout();
    navigate("/");
  };

  const handleLinkClick = () => {
    if (checkboxRef.current) {
      checkboxRef.current.checked = false;
    }
  };

  return (
    <header className="text-gray-50 fixed top-0 left-0 right-0 w-full z-10 bg-opacity-90 backdrop-filter backdrop-blur-lg shadow-lg mx-auto flex flex-col overflow-hidden px-4 py-2  lg:flex-row lg:items-center bg-transparent">
      <Link to="/" className="flex items-center whitespace-nowrap text-2xl bg-transparent" onClick={handleLinkClick}>
        <p className='bg-gradient-to-r from-pink-500 via-purple-500 to-violet-700 bg-clip-text text-transparent font-bold'>HealthAI</p>
      </Link>
      <input type="checkbox" className="peer hidden" id="navbar-open" ref={checkboxRef} />
      <label className="absolute top-5 right-5 cursor-pointer lg:hidden" htmlFor="navbar-open">
        <svg className="h-7 w-7" xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24" stroke="grey">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </label>
      <nav aria-label="Header Navigation" className="p-2  peer-checked:pt-8 peer-checked:max-h-60 flex max-h-0 w-full flex-col items-center overflow-hidden transition-all lg:ml-24 lg:max-h-full lg:flex-row bg-transparent">
        <ul className="flex w-full flex-col items-center space-y-2 lg:flex-row lg:justify-center lg:space-y-0 lg:space-x-12 bg-transparent mt-4">
          <li className="lg:mr-12 bg-transparent">
            <Link className="rounded-xl bg-transparent p-2 text-violet-300 transition hover:bg-violet-100 focus:bg-violet-100 focus:outline-none focus:ring-offset-2 font-bold" to="/about" onClick={handleLinkClick}>About</Link>
          </li>
          <li className="lg:mr-12 bg-transparent">
            <Link className="rounded-xl bg-transparent p-2 text-violet-300 transition hover:bg-violet-100 focus:bg-violet-100  focus:outline-none focus:ring-offset-2 font-bold" to="/healthchat" onClick={handleLinkClick}>Health Chat</Link>
          </li>
          <li className="lg:mr-12 bg-transparent">
            <Link className="rounded-xl bg-transparent p-2 text-violet-300 transition hover:bg-violet-100 focus:bg-violet-100  focus:outline-none focus:ring-offset-2 font-bold" to="/team" onClick={handleLinkClick}>Team</Link>
          </li>
          <li className="lg:mr-12 bg-transparent">
            <Link className="rounded-xl bg-transparent p-2 text-violet-300 transition hover:bg-violet-100 focus:bg-violet-100  focus:outline-none focus:ring-offset-2 font-bold" to="/contact" onClick={handleLinkClick}>Contact</Link>
          </li>
        </ul>
        {isLoggedIn === true ? (
          <div className="flex flex-row">
            <Link
              to={currentUser?.isDoctor ? "/dashboard/appointments" : "/dashboard/doctors"}
              className="text-center rounded-lg bg-gradient-to-tr from-pink-300 via-purple-400 to-violet-700 p-3 m-2 text-white text-sm md:text-base font-semibold transition hover:from-violet-700 hover:to-pink-300 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2 w-30 lg:w-36"
              onClick={handleLinkClick}
            >
              Dashboard
            </Link>
            <button onClick={() => { LogMeOut(); handleLinkClick(); }} className=" text-center rounded-lg bg-gradient-to-tr from-pink-300 via-purple-400 to-violet-700 p-3 m-2 text-white text-sm md:text-base font-semibold transition hover:from-violet-700 hover:to-pink-300 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2 w-30 lg:w-36">
              Logout
            </button>
          </div>
        ) : (
          <>
            <hr className="mt-4 w-full lg:hidden" />
            <button onClick={() => { handleLogin(); handleLinkClick(); }} className=" text-center rounded-lg bg-gradient-to-tr from-pink-300 via-purple-400 to-violet-700 p-3 m-2 text-white text-sm md:text-base font-semibold transition hover:from-violet-700 hover:to-pink-300 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2 w-30 lg:w-36">
              Join Now
            </button>
          </>
        )}
      </nav>
    </header>
  );
}
