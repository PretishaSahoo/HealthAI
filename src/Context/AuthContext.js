import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { auth } from '../firebase';
import { signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged } from 'firebase/auth';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const baseURL = process.env.REACT_APP_MODE === "production" ? "https://health-ai-backend.vercel.app" : "http://localhost:5000";

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoggedIn(true);
        fetchUser(user.uid);
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

  const authContextValue = {
    currentUser,
    isLoggedIn,
    fetchUser,
    setCurrentUser,
    loginWithGoogle,
    logout,
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};
