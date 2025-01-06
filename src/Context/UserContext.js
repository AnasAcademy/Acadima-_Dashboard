import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

import { apiUrl } from "../API";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState(null); // Full user data
  const [userBriefData, setUserBriefData] = useState(null); // Brief user data
  const [categories, setCategories] = useState([]);
  const [appliedPrograms, setAppliedPrograms] = useState([]);
  const [error, setError] = useState(null);

  const token = localStorage.getItem("token");
  const [isFetching, setIsFetching] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const fetchUserData = async () => {
    if (isFetching) return; // Prevent duplicate calls
    setIsFetching(true);

    try {
      const response = await axios.get(`${apiUrl}/panel`, {
        headers: {
          "Cache-Control": "no-cache",
          "Content-Type": "application/json",
          "x-api-key": "1234",
          "ngrok-skip-browser-warning": true,
          Authorization: `Bearer ${token}`,
        },
      });

      const result = response.data.data;
      setUserData(result);
      console.log(result);
    } catch (error) {
      console.error("Error fetching user data:", error);
    } finally {
      setIsFetching(false);
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
    try {
      const response = await fetch(`${apiUrl}/profile/brief`, {
        method: "GET",
        headers: {
          "Cache-Control": "no-cache",
          "Content-Type": "application/json",
          "x-api-key": "1234",
          "ngrok-skip-browser-warning": true,
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        console.error("Failed to fetch user brief data:", response.statusText);
        return;
      }

      const result = await response.json();
      setUserBriefData(result.data);
    } catch (error) {
      console.error("Error fetching user brief data:", error);
    }
  };

  // Fetch program data
  const fetchProgramData = async () => {
    try {
      const headers = {
        "Content-Type": "application/json",
        "x-api-key": "1234",
        "ngrok-skip-browser-warning": true,
        Authorization: `Bearer ${token}`,
      };

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
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch data on mount
  useEffect(() => {
    if (token) {
      // Fetch necessary data when the token is available
      fetchUserData();
      fetchUserBriefData();
      fetchProgramData();
    }
  }, []); // Use `token` as the dependency
  


  return (
    <UserContext.Provider
      value={{
        userData,
        userBriefData,
        setUserData,
        categories,
        setCategories,
        appliedPrograms,
        setAppliedPrograms,
        error
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
