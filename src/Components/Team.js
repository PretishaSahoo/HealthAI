import React from 'react';
import Pretisha from "../Images/Pretisha.jpeg";
import Ananya from "../Images/Ananya.jpeg";
import Debopriya from "../Images/Debopriya.jpeg";
import './Animations.css'

const teamMembers = [
  {
    name: 'Ananya Mishra',
    role: 'ML Developer',
    image: Ananya,
    linkedin: 'https://www.linkedin.com/in/ananya-mishra-41b431248/'
  },
  {
    name: 'Debopriya Lahiri',
    role: 'ML Developer',
    image: Debopriya,
    linkedin: 'https://www.linkedin.com/in/debopriya-lahiri-615a37266/'
  },
  {
    name: 'Pretisha Sahoo',
    role: 'Frontend & Backend Developer',
    image: Pretisha,
    linkedin: 'https://www.linkedin.com/in/pretisha-sahoo/'
  }
];

const Team = () => {
  return (
    <div className="py-10 bg-gray-100 min-h-screen pb-24 animate-float">
      <div className="text-center mb-12 pt-24">
        <h1 className="text-xl sm:text-xl md:text-2xl lg:text-3xl font-bold leading-tight  bg-gradient-to-r from-pink-500 via-purple-500 to-violet-700 bg-clip-text text-transparent mt-24 sm:mt-24 md:mt-24">Meet Our Team</h1>
        <p className="mt-2 text-lg text-gray-700">A group of dedicated professionals driving innovation.</p>
      </div>
      <div className="flex flex-wrap justify-center gap-10 ">
        {teamMembers.map((member, index) => (
          <a
            key={index}
            href={member.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full max-w-xs bg-white shadow-xl rounded-lg overflow-hidden transition-transform transform hover:scale-105"
          >
            <div className="flex justify-center p-4">
              <img
                src={member.image}
                alt={member.name}
                className="w-32 h-32 object-cover rounded-full border-4 border-purple-300 shadow-md"
              />
            </div>
            <div className="p-4 text-center">
              <h2 className="text-2xl font-bold leading-tight bg-gradient-to-r from-pink-500 via-purple-500 to-violet-700 bg-clip-text text-transparent">{member.name}</h2>
              <p className="text-gray-600 mt-1">{member.role}</p>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default Team;
