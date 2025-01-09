import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

import { apiUrl } from "../API";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState(null); // Full user data
  const [userBriefData, setUserBriefData] = useState(null); // Brief user data
  const [classesData, setClassesData] = useState([]); // Classes data
  const [categories, setCategories] = useState([]);
  const [appliedPrograms, setAppliedPrograms] = useState([]);
  const [notifications, setNotifications] = useState([]); // Add notifications state
  const [error, setError] = useState(null);

  const token = localStorage.getItem("token");
  const headers = {
    "Content-Type": "application/json",
    "x-api-key": "1234",
    "ngrok-skip-browser-warning": true,
    Authorization: `Bearer ${token}`,
  };

  const fetchUserData = async () => {
    if (!token) return;

    try {
      const response = await axios.get(`${apiUrl}/panel`, { headers });

      const result = response.data.data;
      setUserData(result);
    } catch (error) {
      console.log("Error fetching user data:", error);
    } 
  };

  // Fetch full user data
  // const fetchUserData = async () => {
  //   try {
  //     const response = await fetch(`${apiUrl}/panel`, {
  //       method: 'GET',
  //       headers: {
  //         'Content-Type': 'application/json',
  //         'x-api-key': '1234',
  //         'ngrok-skip-browser-warning': true,
  //         Authorization: `Bearer ${token}`,
  //       },
  //     });

  //     const result = await response.json();
  //     setUserData(result.data);
  //   } catch (error) {
  //     console.error('Error fetching user data:', error);
  //   }
  // };

  const fetchUserBriefData = async () => {
    if (!token) return;

    try {
      const response = await fetch(`${apiUrl}/profile/brief`, {
        method: "GET",
        headers,
      });

      if (!response.ok) {
        console.error("Failed to fetch user brief data:", response.statusText);
        return;
      }

      const result = await response.json();
      setUserBriefData(result.data);
    } catch (error) {
      console.log("Error fetching user brief data:", error);
    }
  };

  // Fetch program data
  const fetchProgramData = async () => {
    try {
        const response = await fetch(apiUrl + "/panel/programs/apply", {
        method: "GET",
        headers,
      });

      const result = await response.json();
      setCategories(result.data.categories || []);
      setAppliedPrograms(result.data.applied_programs || []);
    } catch (error) {
      // console.error("Error fetching program data:", error);
      setError("حدث خطأ أثناء جلب البيانات. يرجى المحاولة لاحقًا.");
    }
  };

  const fetchClassesData = async () => {
    try {
      const response = await fetch(apiUrl + "/panel/programs/purchases", {
        method: "GET",
        headers,
      });

      const result = await response.json();
      setClassesData(result?.data?.bundles || []);
    } catch (error) {
      console.error("Error fetching classes data:", error);
      setError("حدث خطأ أثناء جلب البيانات. يرجى المحاولة لاحقًا.");
    }
  };

  const fetchNotifications = async () => {
    try {
      const response = await fetch(`${apiUrl}/panel/notifications`, {
        method: "GET",
        headers,
      });

      const result = await response.json();
      setNotifications(result?.data?.notifications || []);
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  };

  const refreshUserData = async () => {
    await fetchUserData();
    await fetchUserBriefData();
    await fetchProgramData();
    await fetchClassesData();
    await fetchNotifications();
  };

  // Fetch data on mount
  useEffect(() => {
    if (token) {
      refreshUserData();
    }
  }, [token]);
  
  return (
    <UserContext.Provider
      value={{
        userData,
        userBriefData,
        categories,
        appliedPrograms,
        classesData,
        notifications,
        fetchNotifications, 
        refreshUserData,
        error
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
