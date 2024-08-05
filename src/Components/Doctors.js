import React from 'react';
import { Link } from 'react-router-dom';
import cardiology from '../Images/cardiology.png';
import dermatology from '../Images/dermatology.jpg';
import neurology from '../Images/neurology.jpg';
import pediatrics from '../Images/pediatrics.png';
import psychiatry from '../Images/psychiatry.jpg';
import oncology from '../Images/oncology.jpg';
import orthopedics from '../Images/orthopedics.avif';
import generalsurgery from '../Images/generalsurgery.png';
import gynecology from '../Images/gynecology.webp';

const specialties = [
  { title: 'Cardiology', image: cardiology },
  { title: 'Dermatology', image: dermatology },
  { title: 'Neurology', image: neurology },
  { title: 'Pediatrics', image: pediatrics },
  { title: 'Psychiatry', image: psychiatry },
  { title: 'Oncology', image: oncology },
  { title: 'Orthopedics', image: orthopedics },
  { title: 'General Surgery', image: generalsurgery },
  { title: 'Gynecology', image: gynecology },
];

export default function Doctors() {
  return (
    <div className="flex flex-wrap gap-4 p-4 mt-24">
      {specialties.map((specialty, index) => (
        <Link
          key={index}
          to={`/dashboard/doctors/${specialty.title.toLowerCase().replace(' ', '')}`}
          className="bg-white shadow-md rounded-lg p-6 w-full sm:w-1/2 lg:w-1/3 xl:w-1/4 text-center transition-transform transform hover:scale-105"
        >
          <img
            src={specialty.image}
            alt={specialty.title}
            className="w-full h-30 object-cover rounded-md mb-4"
          />
          <h2 className="text-xl font-bold text-purple-900 mb-4">{specialty.title}</h2>
        </Link>
      ))}
    </div>
  );
}
