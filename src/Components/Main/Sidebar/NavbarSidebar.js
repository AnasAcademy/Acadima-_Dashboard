import React, { useState, useEffect } from "react";
import "../../../Styles/Main/Sidebar.css";

import NavigationMenu from "./NavigationMenu";

import sidebarlogo from "../../../Images/Sidebar icons/sidebarLogo.png";

function NavbarSidebar({ menuOpen, full_name, user_code, avatar }) {

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
          <span className="sidebarinfo-text">{user_code}</span>
        </div>
      </div>
      <NavigationMenu />
    </div>
  );
}

export default NavbarSidebar;
