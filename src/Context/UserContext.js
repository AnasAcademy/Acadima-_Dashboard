import React, { createContext, useState, useEffect } from 'react';
import { apiUrl } from '../API';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState(null); // Full user data
  const [userBriefData, setUserBriefData] = useState(null); // Brief user data
  const token = localStorage.getItem('token');

  // Fetch full user data
  const fetchUserData = async () => {
    try {
      const response = await fetch(`${apiUrl}/panel`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': '1234',
          'ngrok-skip-browser-warning': true,
          Authorization: `Bearer ${token}`,
        },
      });

      const result = await response.json();
      setUserData(result.data);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  // Fetch brief user data
  const fetchUserBriefData = async () => {
    try {
      const response = await fetch(`${apiUrl}/profile/brief`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': '1234',
          'ngrok-skip-browser-warning': true,
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        console.error('Failed to fetch user brief data:', response.statusText);
        return;
      }

      const result = await response.json();
      setUserBriefData(result.data);
    } catch (error) {
      console.error('Error fetching user brief data:', error);
    }
  };

  // Fetch data on mount
  useEffect(() => {
    if (token) {
      fetchUserData();
      fetchUserBriefData();
    }
  }, [token]);

  return (
    <UserContext.Provider value={{ userData, userBriefData, setUserData }}>
      {children}
    </UserContext.Provider>
  );
};
