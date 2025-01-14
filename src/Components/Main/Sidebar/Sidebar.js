import React, { useContext } from "react";
import { UserContext } from "../../../Context/UserContext";
import "../../../Styles/Main/Sidebar.css";

import NavigationMenu from "./NavigationMenu";

import sidebarlogo from "../../../Images/Sidebar icons/sidebarLogo.png";

function Sidebar({userBriefData}) {
    const { installmentsCount} = useContext(UserContext);
  
  return (
    <>
      <div className="sidebar">
        <img src={userBriefData?.avatar || sidebarlogo} alt="sidebarlogo" className="sidebarlogo" />
        <NavigationMenu installmentsCount={installmentsCount}/>
      </div>
      <span className="sidebar-separator"></span>
      
    </>
  );
}

export default Sidebar;
