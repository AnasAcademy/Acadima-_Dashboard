import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "../../Styles/Main/Navbar.css";

import AcadimaLogo from "../../Images/AcadimaLogo.png";
import notif from '../../Images/notification.svg';
import activeNotif from "../../Images/active-notification.svg";
import NavbarSidebar from "./Sidebar/NavbarSidebar";

function Navbar({ userBriefData, hasUnreadNotifications  }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation(); // Hook to get the current route

  const handleMenuToggle = () => {
    setMenuOpen((prev) => !prev); // Toggle menu open/close
  };

  // Close the menu when the route changes
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  return (
    <div className="navbar">
      <img src={AcadimaLogo} alt="AcadimaLogo" className="AcadimaLogo" />

      <div className="hamburger" onClick={handleMenuToggle}>
        <span className={menuOpen ? "line open" : "line"}></span>
        <span className={menuOpen ? "line open" : "line"}></span>
        <span className={menuOpen ? "line open" : "line"}></span>
      </div>

      <NavbarSidebar
        menuOpen={menuOpen}
        full_name={userBriefData?.full_name}
        user_code={userBriefData?.user_code}
        avatar={userBriefData?.avatar}
      />

      <div className={`navbar-left`}>
        <p className="language-toggle">En</p>
        <img
          src={hasUnreadNotifications ? activeNotif : notif}
          alt="Notification Icon"
          className="notification-icon"
        />
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
