import React, { useState, useEffect } from 'react';
import { useAuth } from '../Context/AuthContext';
import upload from './Upload.js';

const EditDoctor = () => {
  const { currentUser, editDoctor } = useAuth();

  const [formData, setFormData] = useState({
    email: '',
    uid: '',
    phone: '',
    clinicAddress: '',
    specialization: [],
    experience: '',
    fees: '',
    workingHours: { start: '', end: '' }
  });

  const [file, setFile] = useState({ file: null, filename: '' });

  useEffect(() => {
    if (currentUser) {
      setFormData({
        email: currentUser.email || '',
        uid: currentUser.uid || '',
        phone: currentUser.doctorDetails?.phone || '',
        clinicAddress: currentUser.doctorDetails?.clinicAddress || '',
        specialization: currentUser.doctorDetails?.specialization || [],
        experience: currentUser.doctorDetails?.experience || '',
        fees: currentUser.doctorDetails?.fees || '',
        workingHours: currentUser.doctorDetails?.workingHours || { start: '', end: '' }
      });
    }
  }, [currentUser]);

  const specializations = [
    "Cardiology", "Dermatology", "Neurology", "Pediatrics",
    "Psychiatry", "Oncology", "Orthopedics", "General Surgery", "Gynecology"
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleWorkingHoursChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      workingHours: { ...formData.workingHours, [name]: value }
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFile({ file: file, filename: file.name });
  };

  const toggleSpecialization = (specialization) => {
    setFormData(prevFormData => {
      const updatedSpecializations = prevFormData.specialization.includes(specialization)
        ? prevFormData.specialization.filter(item => item !== specialization)
        : [...prevFormData.specialization, specialization];
      return { ...prevFormData, specialization: updatedSpecializations };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const doctorData = { ...formData };
    if (file.file) {
      const profilePic = await upload(file.file);
      doctorData.profilePic = profilePic;
    }

    try {
      await editDoctor(doctorData);
      alert('Profile updated successfully');
    } catch (error) {
      console.error('Error updating doctor:', error);
    }
  };

  return (
    <>
      <div className="text-center">
        <h2 className="text-xl sm:text-xl md:text-2xl lg:text-3xl font-bold leading-tight text-purple-700 mt-24 sm:mt-24 md:mt-24">
          Edit Profile
        </h2>
      </div>
      <div className="max-w-[1200px] h-[90%] mx-auto items-center justify-center mt-6 bg-white p-12 rounded shadow-lg">
        <form className="w-full" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="flex flex-col">
              <label className="text-violet-700">Phone Number</label>
              <input
                type="text"
                name="phone"
                placeholder="Enter your Phone Number"
                value={formData.phone}
                onChange={handleChange}
                className="p-2 border border-gray-300 rounded bg-white text-violet-700 focus:border-violet-500 focus:ring-violet-500"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-violet-700">Clinic Address</label>
              <textarea
                name="clinicAddress"
                placeholder="Enter your Clinic Address"
                value={formData.clinicAddress}
                onChange={handleChange}
                className="p-2 border border-gray-300 rounded bg-white text-violet-700 focus:border-violet-500 focus:ring-violet-500"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-violet-700">Experience</label>
              <input
                type="text"
                name="experience"
                placeholder="Experience"
                value={formData.experience}
                onChange={handleChange}
                className="p-2 border border-gray-300 rounded bg-white text-violet-700 focus:border-violet-500 focus:ring-violet-500"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-violet-700">Consultation Fees</label>
              <input
                type="text"
                name="fees"
                placeholder="Your consultation fees"
                value={formData.fees}
                onChange={handleChange}
                className="p-2 border border-gray-300 rounded bg-white text-violet-700 focus:border-violet-500 focus:ring-violet-500"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-violet-700">Working Hours Start</label>
              <input
                type="time"
                name="start"
                value={formData.workingHours.start}
                onChange={handleWorkingHoursChange}
                className="p-2 border border-gray-300 rounded bg-white text-violet-700 focus:border-violet-500 focus:ring-violet-500"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-violet-700">Working Hours End</label>
              <input
                type="time"
                name="end"
                value={formData.workingHours.end}
                onChange={handleWorkingHoursChange}
                className="p-2 border border-gray-300 rounded bg-white text-violet-700 focus:border-violet-500 focus:ring-violet-500"
              />
            </div>
            <div className="flex flex-col col-span-1 md:col-span-2 lg:col-span-2">
              <label className="text-violet-700">Profile Picture</label>
              <div className="flex items-center ">
                <input
                  type="file"
                  onChange={handleFileChange}
                  id="profilePic"
                  className="hidden"
                />
                <label
                  htmlFor="profilePic"
                  className="cursor-pointer px-4 py-2 bg-violet-700 text-white rounded shadow hover:bg-violet-600"
                >
                  {file.filename ? file.filename : 'Choose File'}
                </label>
              </div>
            </div>
            <div className="flex flex-col col-span-1 md:col-span-2 lg:col-span-2">
              <label className="text-violet-700">Specializations</label>
              <div className="flex flex-wrap gap-2">
                {specializations.map(spec => (
                  <div key={spec} className="flex items-center">
                    <input
                      type="checkbox"
                      id={spec}
                      checked={formData.specialization.includes(spec)}
                      onChange={() => toggleSpecialization(spec)}
                      className="mr-2"
                    />
                    <label htmlFor={spec} className="text-violet-700">{spec}</label>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="mt-6 flex justify-center">
            <button
              type="submit"
              className="px-4 py-2 bg-violet-700 text-white rounded shadow hover:bg-violet-600"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default EditDoctor;
