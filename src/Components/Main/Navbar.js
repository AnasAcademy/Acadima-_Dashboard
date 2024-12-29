import React, { useState, useEffect } from "react";
import "../../Styles/Main/Navbar.css";
import { apiUrl } from "../../API";

import AcadimaLogo from "../../Images/AcadimaLogo.png";
import activeNotif from "../../Images/active-notification.svg";

function Navbar() {
  const [userBriefData, setUserBriefData] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false); // State to track menu toggle

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

  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="navbar">
      <img src={AcadimaLogo} alt="AcadimaLogo" className="AcadimaLogo" />

      <div className="hamburger" onClick={handleMenuToggle}>
        <span className={menuOpen ? "line open" : "line"}></span>
        <span className={menuOpen ? "line open" : "line"}></span>
        <span className={menuOpen ? "line open" : "line"}></span>
      </div>

      <div className={`navbar-left ${menuOpen ? "open" : ""}`}>
        <p className="language-toggle">En</p>
        <img src={activeNotif} alt="activeNotif" className="activeNotif" />
        <span className="nav-separator"></span>
        <div className="navbar-p">
          <p className="student-name">{userBriefData?.full_name}</p>
          <p className="student-code">{userBriefData?.user_code}</p>
        </div>
        <img src={userBriefData?.avatar} alt="logo" className="logo" />
      </div>
    </div>
  );
}

export default Navbar;
