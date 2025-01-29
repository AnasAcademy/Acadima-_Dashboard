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
  const [installmentsCount, setInstallmentsCount] = useState(false);
  const [availableCertificates, setAvailableCertificates] =  useState(0);
  const [courseData, setCourseData] = useState(null); // Course data
  const [chapters, setChapters] = useState([]); // Course chapters
  const [quizzes, setQuizzes] = useState([]);
  const [teacher, setTeacher] = useState([]);
  const [error, setError] = useState(null);

  const [singlePageProgramData, setSinglePageProgramData] = useState([]);

  const [token, setToken] = useState(localStorage.getItem("token")); // Track token
  const headers = {
    "Content-Type": "application/json",
    "x-api-key": "1234",
    "ngrok-skip-browser-warning": true,
    Authorization: `Bearer ${localStorage.getItem("token")}`, // Use localStorage directly
  };

  const fetchUserData = async () => {
    // if (!token) return;

    try {
      const response = await axios.get(`${apiUrl}/panel`, { headers: {
        "Content-Type": "application/json",
        "x-api-key": "1234",
        "ngrok-skip-browser-warning": true,
        Authorization: `Bearer ${localStorage.getItem("token")}`, // Use localStorage directly
      }, });

      const result = response.data.data;
      setUserData(result);
    } catch (error) {
      // console.log("Error fetching user data:", error);
    } 
  };

  const fetchUserBriefData = async () => {
    // if (!token) return;

    try {
      const response = await fetch(`${apiUrl}/profile/brief`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": "1234",
          "ngrok-skip-browser-warning": true,
          Authorization: `Bearer ${localStorage.getItem("token")}`, // Use localStorage directly
        },
      });

      if (!response.ok) {
        // console.log("Failed to fetch user brief data:", response.statusText);
        return;
      }

      const result = await response.json();
      setUserBriefData(result.data);
    } catch (error) {
      // console.log("Error fetching user brief data:", error);
    }
  };

  // Fetch program data
  const fetchProgramData = async () => {
    try {
        const response = await fetch(apiUrl + "/panel/programs/apply", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": "1234",
          "ngrok-skip-browser-warning": true,
          Authorization: `Bearer ${localStorage.getItem("token")}`, // Use localStorage directly
        },
      });

      const result = await response.json();
      setCategories(result.data.categories || []);
      setAppliedPrograms(result.data.applied_programs || []);
    } catch (error) {
      // console.error("Error fetching program data:", error);
      setError("حدث خطأ أثناء جلب البيانات. يرجى المحاولة لاحقًا.");
    }
  };

  const fetchClassesData = async (page = 1) => {
    try {
      const response = await fetch(`${apiUrl}/panel/programs/purchases?page=${page}`, {
        method: "GET",
        headers,
      });

      const result = await response.json();
      setClassesData(result?.data?.bundles?.data || []);
      return {
        classes: result?.data?.bundles?.data || [],
        lastPage: result?.data?.bundles?.last_page || 1,
      };
    } catch (error) {
      // console.log("Error fetching classes data:", error);
      setError("حدث خطأ أثناء جلب البيانات. يرجى المحاولة لاحقًا.");
      return { classes: [], lastPage: 1 };
    }
  };
  
  const fetchNotifications = async () => {
    try {
      const response = await fetch(`${apiUrl}/panel/notifications`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": "1234",
          "ngrok-skip-browser-warning": true,
          Authorization: `Bearer ${localStorage.getItem("token")}`, // Use localStorage directly
        },
      });

      const result = await response.json();
      setNotifications(result?.data?.notifications || []);
    } catch (error) {
      // console.log("Error fetching notifications:", error);
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
          Authorization: `Bearer ${localStorage.getItem("token")}`, // Use localStorage directly
        },
      });

      const result = await response.json();
      // // console.log(result);
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
      // console.log(error);
    }
  };

  const fetchAppliedProgramsData = async () => {
    try {
      const response = await axios.get(apiUrl + "/panel/programs/applieds", {
        headers: {
          "Content-Type": "application/json",
          "x-api-key": "1234",
          "ngrok-skip-browser-warning": true,
          Authorization: `Bearer ${localStorage.getItem("token")}`, // Use localStorage directly
          accept: "application/json",
        },
      });

      // const result = await response.json();
      setPrograms(response.data.data);
      // console.log(programs);
    } catch (error) {
      // console.log(error);
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
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Use localStorage directly
          },
         }
      );
      const result = await response.json();
      
      setCertificates(result?.data?.bundleCertificates || []);
      setAvailableCertificates(result?.data?.bundleCertificates.length);
    } catch (error) {
      // console.log("Error fetching certificates:", error);
      setError("حدث خطأ أثناء جلب الشهادات.");
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
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
  
      const result = await response.json();
      const ordersList = result?.data?.ordersList || [];
  
      // Check if any orders have incomplete installments
      const hasIncompleteOrders = ordersList.some(
        (order) => order.orderIsCompleted === false
      );
  
      // Update the state with fetched data
      setProgramsInstallmentData(ordersList);
  
      // Update installmentsCount based on the condition
      setInstallmentsCount(hasIncompleteOrders);
  
    } catch (error) {
      // console.log("Error fetching installment data:", error);
    }
  };
  
  const fetchCourseData = async (classId, courseId) => {
    try {
      const response = await fetch(
        `${apiUrl}/${classId}/learning-page/${courseId}`,
        { headers }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const result = await response.json();
      setCourseData(result.data);
      setChapters(result.data?.course?.chapters || []);
      setQuizzes(result.data?.course?.quizzes || []);
      setTeacher(result.data?.course?.teacher || []);
    } catch (error) {
      console.error("Error fetching course data:", error);
    }
  };
  

  const fetchSinglePageProgramData = async () => {
    try {
      const response = await fetch(apiUrl + "/programs", {
        method: "GET",
        headers: {
          "x-api-key": "1234",
        },
      });

      const result = await response.json();
      // // console.log(result);
      setSinglePageProgramData(result.data);

    } catch (error) {
      // console.log(error);
    }
  };

  const refreshUserData = async () => {
    await fetchUserData();
    await fetchUserBriefData();
    await fetchProgramData();
    await fetchClassesData();
    await fetchNotifications();
    await fetchAllUserSettingsData();
    await fetchAppliedProgramsData();
    await fetchProgramsInstallmentData();
    await fetchSinglePageProgramData();
    if (programs?.length > 0) {
      await fetchCertificates(); // Fetch certificates only if programs exist
    }  };

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
        fetchClassesData,
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
        fetchAppliedProgramsData,
        ProgramsInstallmentData,
        installmentsCount,
        courseData,
        chapters,
        quizzes,
        teacher,
        fetchSinglePageProgramData,
        singlePageProgramData,
        fetchCourseData,
        error
      }}
    >
      {children}
    </UserContext.Provider>
  );
};