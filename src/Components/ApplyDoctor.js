import React, { useState, useEffect } from 'react';
import { useAuth } from '../Context/AuthContext';
import upload from './Upload.js';

const ApplyDoctor = () => {
  const { currentUser ,applyDoctor} = useAuth();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    uid: '',
    phone: '',
    clinicAddress: '',
    specialization: [],
    experience: '',
    fees: ''
  });

  const [workingHours, setWorkingHours] = useState({
    workingHoursStart: '',
    workingHoursEnd: ''
  });

  const [file, setFile] = useState({ file: null, filename: '' });

  useEffect(() => {
    if (currentUser) {
      setFormData((prevData) => ({
        ...prevData,
        email: currentUser.email,
        uid: currentUser.uid
      }));
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
    setWorkingHours({ ...workingHours, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFile({ file: file, filename: file.name });
  };

  const toggleSpecialization = (specialization) => {
    setFormData((prevFormData) => {
      const updatedSpecializations = prevFormData.specialization.includes(specialization)
        ? prevFormData.specialization.filter((item) => item !== specialization)
        : [...prevFormData.specialization, specialization];
      return { ...prevFormData, specialization: updatedSpecializations };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file.file) {
      alert("Please upload a profile picture.");
      return;
    }
    const profilePic = await upload(file.file);
    const doctorData = {
      ...formData,
      workingHours: {
        start: workingHours.workingHoursStart,
        end: workingHours.workingHoursEnd
      },
      profilePic: profilePic
    };
    await applyDoctor(doctorData);
    setFile({ file: file, filename: file.name });
    setWorkingHours({
      workingHoursStart: '',
      workingHoursEnd: ''
    })
    setFormData({
      name: '',
      email: '',
      uid: '',
      phone: '',
      clinicAddress: '',
      specialization: [],
      experience: '',
      fees: ''
    });
  };

  return (
    <>
      <div className="text-center">
        <h2 className="text-xl sm:text-xl md:text-2xl lg:text-3xl font-bold leading-tight text-purple-700 mt-24 sm:mt-24 md:mt-24">
          Apply as a Doctor
        </h2>
      </div>
      <div className="max-w-[1200px] h-[90%] mx-auto items-center justify-center mt-6 bg-white p-12 rounded shadow-lg">
        <form className="w-full" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="flex flex-col">
              <label className="text-violet-700">Name</label>
              <input
                type="text"
                name="name"
                placeholder="Enter your name"
                value={formData.name}
                onChange={handleChange}
                className="p-2 border border-gray-300 rounded bg-white text-violet-700 focus:border-violet-500 focus:ring-violet-500"
              />
            </div>
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
                name="workingHoursStart"
                value={workingHours.workingHoursStart}
                onChange={handleWorkingHoursChange}
                className="p-2 border border-gray-300 rounded bg-white text-violet-700 focus:border-violet-500 focus:ring-violet-500"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-violet-700">Working Hours End</label>
              <input
                type="time"
                name="workingHoursEnd"
                value={workingHours.workingHoursEnd}
                onChange={handleWorkingHoursChange}
                className="p-2 border border-gray-300 rounded bg-white text-violet-700 focus:border-violet-500 focus:ring-violet-500"
              />
            </div>
            <div className="flex flex-col col-span-1 md:col-span-2 lg:col-span-2">
              <label className="text-violet-700">Profile Picture</label>
              <div className="relative">
                <button
                  type="button"
                  onClick={() => document.getElementById('fileInput').click()}
                  className="w-full p-2 border border-gray-300 rounded bg-white text-violet-700 focus:border-violet-500 focus:ring-violet-500"
                >
                  {(file.filename === "" && file.file===null ) ? "Choose File" : file.filename}
                </button>
                <input
                  type="file"
                  id="fileInput"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </div>
            </div>
            <div className="flex flex-col col-span-1 md:col-span-2 lg:col-span-3">
              <label className="text-violet-700">Specialization</label>
              <div className="p-2 border border-gray-300 rounded bg-white text-violet-700 focus:border-violet-500 focus:ring-violet-500">
                <div className="flex flex-wrap">
                  {specializations.map((specialization) => (
                    <div key={specialization} className="flex items-center mr-4 mb-2">
                      <input
                        type="checkbox"
                        id={specialization}
                        value={specialization}
                        checked={formData.specialization.includes(specialization)}
                        onChange={() => toggleSpecialization(specialization)}
                        className="mr-2"
                      />
                      <label htmlFor={specialization}>{specialization}</label>
                    </div>
                  ))}
                </div>
              </div>
              <div className="mt-2 p-2 border border-gray-300 rounded bg-white text-violet-700">
                {formData.specialization.length === 0
                  ? "No specialization selected"
                  : formData.specialization.join(', ')}
              </div>
            </div>
          </div>
          <div className="sm:col-span-2">
            <button type="submit" className="text-xl w-full p-2 mt-2 font-semibold text-white bg-purple-600 rounded-md hover:bg-purple-700">
              Submit Application
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default ApplyDoctor;
