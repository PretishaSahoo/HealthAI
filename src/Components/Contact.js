import React from 'react';
import './Animations.css'

export default function Contact() {
  return (
    <div className="max-w-[1200px] mx-auto bg-white sm:py-20 p-5 animate-floatdown">

      <div className="text-center">
      <h2 className="text-xl sm:text-xl md:text-2xl lg:text-3xl font-bold leading-tight bg-gradient-to-r from-pink-500 via-purple-500 to-violet-700 bg-clip-text text-transparent  mt-24 sm:mt-24 md:mt-24">
        Contact and Support
        </h2>

      </div>

      <div className="max-w-[80vw] mx-auto rounded mt-8" style={{ boxShadow: "0 0 20px 10px rgba(128, 128, 128, 0.1)" }}>
        <div className="mt-6 rounded-xl">
          <div className="p-10">

            <form action="https://getform.io/f/panvoena" method="POST">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-5 gap-y-4">

                <div>
                  <div className="mt-2.5">
                    <input name="name" id="name" type="text" placeholder="Enter Your Name" className="bg-white w-full px-4 py-4 text-gray-700 placeholder-gray-400 border border-gray-300 rounded-md focus:outline-none focus:border-purple-700" />
                  </div>
                </div>

                <div>
                  <div className="mt-2.5">
                    <input name="email" id="email" type="email" placeholder="Enter Your Email" className="bg-white w-full px-4 py-4 text-gray-700 placeholder-gray-400 border border-gray-300 rounded-md focus:outline-none focus:border-purple-700" />
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <div className="mt-2.5">
                    <textarea name="message" id="message" placeholder="Type your query here ..." className="bg-white w-full px-4 py-4 text-gray-700 placeholder-gray-400 border border-gray-300 rounded-md focus:outline-none focus:border-purple-600" />
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <button className="rounded-lg bg-gradient-to-tr from-pink-300 via-purple-400 to-violet-700 p-3 m-2 text-white text-sm md:text-base font-semibold transition hover:from-violet-700 hover:to-pink-300 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2 w-full">Send</button>
                </div>

              </div>
            </form> 

          </div>
        </div>
      </div>

    </div>
  );
}
