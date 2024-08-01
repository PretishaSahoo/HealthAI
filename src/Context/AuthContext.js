import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { auth } from '../firebase';
import { signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged } from 'firebase/auth';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [doctors, setDoctors] = useState([]);

  const baseURL = process.env.REACT_APP_MODE === "production" ? "https://health-ai-backend.vercel.app" : "http://localhost:5000";

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoggedIn(true);
        fetchUser(user.uid);
        if (!user.isDoctor) {
          fetchAllDoctors();
        }
      } else {
        setCurrentUser(null);
        setIsLoggedIn(false);
      }
    });
    return unsubscribe;
  }, []);

  const fetchUser = async (uid) => {
    try {
      const response = await axios.post(`${baseURL}/api/user/fetchuser`, { uid });
      setCurrentUser(response.data.user);
    } catch (error) {
      console.log(error);
    }
  };

  const loginWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const userCredential = await signInWithPopup(auth, provider);
      const user = userCredential.user;
      const response = await axios.post(`${baseURL}/api/user/fetchuser`, { uid: user.uid });
      if (!response.data.exists) {
        await axios.post(`${baseURL}/api/user/signup`, {
          name: user.displayName,
          email: user.email,
          uid: user.uid,
        });
      }
      await fetchUser(user.uid);
    } catch (error) {
      console.log(error)
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      setCurrentUser(null);
      setIsLoggedIn(false);
    } catch (error) {
      console.log(error)
    }
  };

  const applyDoctor = async (doctorData) => {
    try {
      const response = await axios.post(`${baseURL}/api/doctor/applyDoctor`, doctorData);
      fetchUser(response.data.uid);
      console.log(response.data);
    } catch (error) {
      console.error('Error applying as doctor:', error);
      throw error;
    }
  };

  const editDoctor = async (doctorData) => {
    try {
      const response = await axios.post(`${baseURL}/api/doctor/editDoctor`, doctorData);
      console.log(response.data);
    } catch (error) {
      console.error('Error editing doctor profile:', error);
      throw error;
    }
  };

  const fetchAllDoctors = async () => {
    try {
      const response = await axios.get(`${baseURL}/api/doctor/fetchAllDoctors`);
      setDoctors(response.data.doctors);
    } catch (error) {
      console.log(error);
    }
  };

  const bookAppointment = async(data) => {
    try {
      const response = await axios.post(`${baseURL}/api/user/bookAppointment`,data);
      if (response.data.message==="Oops this time slot is not available !"){
        alert("Oops this time slot is not available . Please select another timings!")
      }
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  const acceptAppointment = async(data) => {
    try {
      const response = await axios.post(`${baseURL}/api/doctor/accept`,data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  }


  const rejectAppointment = async(data) => {
    try {
      const response = await axios.post(`${baseURL}/api/doctor/reject`,data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  }



  const authContextValue = {
    currentUser,
    isLoggedIn,
    fetchUser,
    setCurrentUser,
    loginWithGoogle,
    logout,
    applyDoctor,
    editDoctor,
    doctors,
    bookAppointment,
    acceptAppointment,
    rejectAppointment
  };


  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};
