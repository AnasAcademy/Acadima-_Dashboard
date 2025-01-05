import React, { useState, useEffect } from "react";
import "../../Styles/Main/MainPageContainer.css";
import { apiUrl } from "../../API";

import Navbar from "../Main/Navbar";
import Sidebar from "../Main/Sidebar/Sidebar";

function MainPageContainer({ children }) {
  const [menuOpen, setMenuOpen] = useState(false); // State for sidebar visibility

  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen); // Toggle the sidebar
  };

  const [userBriefData, setUserBriefData] = useState(null);

  const token = localStorage.getItem("token");

  const fetchUserData = async () => {
    try {
      const response = await fetch(apiUrl + "/profile/brief", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": "1234",
          "ngrok-skip-browser-warning": true,
          Authorization: "Bearer " + token,
        },
      });

      const result = await response.json();
      setUserBriefData(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <div className="main-page">
      <Navbar menuOpen={menuOpen} onMenuToggle={handleMenuToggle} userBriefData={userBriefData}/>
      <div className="main-container">
        <Sidebar menuOpen={menuOpen} userBriefData={userBriefData}/>
        <div className="main-content">{children}</div>
      </div>
    </div>
  );
}

export default MainPageContainer;
