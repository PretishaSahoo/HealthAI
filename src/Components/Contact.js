import React from 'react';

export default function Contact() {
  return (
    <div className="max-w-[1200px] mx-auto bg-white sm:py-20 p-5">

      <div className="text-center">
      <h2 className="text-xl sm:text-xl md:text-2xl lg:text-3xl font-bold leading-tight text-purple-700 mt-24 sm:mt-24 md:mt-24">
  Contact and Support
</h2>

      </div>

      <div className="max-w-[800px] mx-auto rounded mt-8" style={{ boxShadow: "0 0 20px 10px rgba(128, 128, 128, 0.1)" }}>
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
                  <button className="text-xl w-full p-2 mt-2 font-semibold text-white bg-purple-600 rounded-md hover:bg-purple-700">Send</button>
                </div>

              </div>
            </form> 

          </div>
        </div>
      </div>

    </div>
  );
}
