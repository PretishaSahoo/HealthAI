import React from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext';

// Sample doctor profiles
const doctorProfiles = [
  {
    id: 1,
    name: 'Dr. Jane Smith',
    profilePic: 'https://via.placeholder.com/150',
    specialization: 'cardiology',
    experience: '10 years',
    clinicAddress: '123 Heart Ave, Cardiology City',
    fees: '$150',
    workingHours: { start: '09:00 AM', end: '05:00 PM' }
  },
  
];

export default function DoctorsList() {

  const {doctors} = useAuth() ;

 
  const { specialization } = useParams(); 

  const filteredDoctors = doctors.filter((doctor) =>
    doctor.specialization.some((spec) => spec.toLowerCase() === specialization.toLowerCase())
  );


  console.log(filteredDoctors)

  return (
    <div className="p-4 mt-24">
      <h1 className="text-3xl font-bold text-purple-900 mb-6">
        Doctors - {specialization.charAt(0).toUpperCase() + specialization.slice(1)}
      </h1>
      <div className="flex flex-wrap gap-6">
        {filteredDoctors.length > 0 ? (
          filteredDoctors.map((doctor) => (
            <div
              key={doctor.id}
              className="bg-white shadow-md rounded-lg p-6 w-full sm:w-1/2 lg:w-1/3 xl:w-1/4 text-center transition-transform transform hover:scale-105 cursor-pointer"
            >
              <img
                src={doctor.profilePic}
                alt={doctor.name}
                className="w-32 h-32 object-cover rounded-full mx-auto mb-4"
              />
              <h2 className="text-xl font-bold text-purple-900 mb-2">{doctor.name}</h2>
              <p className="text-gray-600 text-base">
                <strong>Specialization:</strong> {specialization}
              </p>
              <p className="text-gray-600 text-base">
                <strong>Experience:</strong> {doctor.experience}
              </p>
              <p className="text-gray-600 text-base">
                <strong>Clinic Address:</strong> {doctor.clinicAddress}
              </p>
              <p className="text-gray-600 text-base">
                <strong>Fees:</strong> {doctor.fees}
              </p>
              <p className="text-gray-700 text-base">
                <strong>Working Hours:</strong> {doctor.workingHours.start} - {doctor.workingHours.end}
              </p>
              <button className="text-center text-white m-2 bg-violet-600 rounded-lg p-2">Book Appointment</button>
            </div>
          ))
        ) : (
          <p className="text-gray-700">No doctors found for this specialization.</p>
        )}
      </div>
    </div>
  );
}
