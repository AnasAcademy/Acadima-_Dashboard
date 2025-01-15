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
  const [allUserSettingsData, setAllUserSettingsData] = useState({});
  const [progressData, setProgressData] = useState({
    basicData: 0,
    personalData: 0,
    education: 0,
    experience: 0,
    additionalInfo: 0,
    workLinks: 0,
    references: 0,
  });
  const [certificates, setCertificates] = useState([]); // New state for certificates
  const [programs, setPrograms] = useState([]);
  const [ProgramsInstallmentData, setProgramsInstallmentData] = useState([]);
  const [installmentsCount, setInstallmentsCount] = useState(0);
  const [availableCertificates, setAvailableCertificates] =  useState(0);

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

  const fetchAllUserSettingsData = async () => {
    try {
      const response = await fetch(apiUrl + "/profile", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": "1234",
          "ngrok-skip-browser-warning": true,
          Authorization: "Bearer " + token,
        },
      });

      const result = await response.json();
      // console.log(result);
      setAllUserSettingsData(result.data);

      setProgressData(
        {
          basicData: 0,
          personalData: 0,
          education: 0,
          experience: 0,
          additionalInfo: 0,
          workLinks: 0,
          references: 0,
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  const fetchCertificates = async () => {
    try {
      const response = await fetch(
        `${apiUrl}/panel/certificates/achievements`,
        { method: "GET", 
          headers: {
            "Content-Type": "application/json",
            "x-api-key": "1234",
            "ngrok-skip-browser-warning": true,
            Authorization: "Bearer " + token,
          },
         }
      );
      const result = await response.json();
      setCertificates(result?.data?.bundleCertificates || []);
      setAvailableCertificates(result?.data?.bundleCertificates.length);
    } catch (error) {
      console.error("Error fetching certificates:", error);
      setError("حدث خطأ أثناء جلب الشهادات.");
    }
  };

  const fetchAppliedProgramsData = async () => {
    try {
      const response = await fetch(apiUrl + "/panel/programs/applieds", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": "1234",
          "ngrok-skip-browser-warning": true,
          Authorization: "Bearer " + token,
          accept: "application/json",
        },
      });

      const result = await response.json();
      // console.log(result);
      setPrograms(result.data);
      // console.log(result.data);

    } catch (error) {
      console.log(error);
    }
  };

  const fetchProgramsInstallmentData = async () => {
    try {
      const response = await fetch(apiUrl + "/panel/financial/installments", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": "1234",
          "ngrok-skip-browser-warning": true,
          Authorization: "Bearer " + token,
        },
      });

      const result = await response.json();
      setProgramsInstallmentData(result?.data?.ordersList);
      setInstallmentsCount(result?.data?.overdueInstallmentsCount);
    } catch (error) {
      console.log(error);
    }
  };

  const refreshUserData = async () => {
    await fetchUserData();
    await fetchUserBriefData();
    await fetchProgramData();
    await fetchClassesData();
    await fetchNotifications();
    await fetchCertificates(); // Fetch certificates
    await fetchAllUserSettingsData();
    await fetchAppliedProgramsData();
    await fetchProgramsInstallmentData();
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
        progressData,
        allUserSettingsData,
        setAllUserSettingsData,
        setProgressData,
        certificates,
        availableCertificates,
        programs,
        ProgramsInstallmentData,
        installmentsCount,
        error
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
