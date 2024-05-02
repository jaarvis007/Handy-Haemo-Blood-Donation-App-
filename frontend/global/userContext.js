// UserContext.js
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useEffect, useState } from 'react';


const UserContext = createContext();
export const useUser = () => useContext(UserContext);

// AsyncStorage
export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const fetchCurrentUser = async () => {
    AsyncStorage.getItem("user").then((data) => {
      return (JSON.parse(data));
    });
  };

  useEffect(() => {
    const loadCurrentUser = async () => {
      const user = await fetchCurrentUser();
      console.log(user)
      setCurrentUser(user);
    };

    loadCurrentUser();
  }, []);

  return (
    <UserContext.Provider value={currentUser}>
      {children}
    </UserContext.Provider>
  );
};
