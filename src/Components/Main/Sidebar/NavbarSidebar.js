import React, { useState, useEffect, useContext } from "react";
import "../../../Styles/Main/Sidebar.css";
import { UserContext } from "../../../Context/UserContext";
import NavigationMenu from "./NavigationMenu";

import sidebarlogo from "../../../Images/Sidebar icons/sidebarLogo.png";

function NavbarSidebar({ menuOpen, full_name, user_code, avatar, hasUserCode}) {
  const { installmentsCount, availableCertificates } = useContext(UserContext);

  return (
    <div className={`navbar-sidebar ${menuOpen ? "open" : ""}`}>
      <div className="navbar-sidebar_logo">
        <img
          src={avatar || sidebarlogo}
          alt="sidebarlogo"
          className="sidebarlogo"
        />
        <div className="sidebarinfo">
          <span className="sidebarinfo-text">{full_name}</span>
          <span className="sidebarinfo-code">{user_code}</span>
        </div>
      </div>
      <NavigationMenu  
        installmentsCount={installmentsCount}
        availableCertificates={availableCertificates}
        hasUserCode={hasUserCode}/>
    </div>
  );
}

export default NavbarSidebar;
