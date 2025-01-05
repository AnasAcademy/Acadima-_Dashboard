import React, { useState, useEffect } from "react";
import "../../../Styles/Main/Sidebar.css";

import NavigationMenu from "./NavigationMenu";

import sidebarlogo from "../../../Images/Sidebar icons/sidebarLogo.png";

function Sidebar({userBriefData}) {
  
  return (
    <>
      <div className="sidebar">
        <img src={userBriefData?.avatar || sidebarlogo} alt="sidebarlogo" className="sidebarlogo" />
        <NavigationMenu />
      </div>
      <span className="sidebar-separator"></span>
      
    </>
  );
}

export default Sidebar;
