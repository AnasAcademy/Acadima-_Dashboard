import React, { useState, useEffect } from "react";
import "../../Styles/Main/Navbar.css";

import AcadimaLogo from "../../Images/AcadimaLogo.png";
import activeNotif from "../../Images/active-notification.svg";
import NavbarSidebar from './Sidebar/NavbarSidebar';

function Navbar({ menuOpen, onMenuToggle, userBriefData }) {
  
  return (
    <div className="navbar">
      <img src={AcadimaLogo} alt="AcadimaLogo" className="AcadimaLogo" />

      <div className="hamburger" onClick={onMenuToggle}>
        <span className={menuOpen ? "line open" : "line"}></span>
        <span className={menuOpen ? "line open" : "line"}></span>
        <span className={menuOpen ? "line open" : "line"}></span>
      </div>

      <NavbarSidebar menuOpen={menuOpen} full_name={userBriefData?.full_name} user_code={userBriefData?.user_code} avatar={userBriefData?.avatar}/>

      <div className={`navbar-left`}>
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
