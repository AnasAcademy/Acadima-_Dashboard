import React, { useContext } from "react";
import { UserContext } from "../../../Context/UserContext";
import "../../../Styles/Main/Sidebar.css";

import NavigationMenu from "./NavigationMenu";

import sidebarlogo from "../../../Images/Sidebar icons/sidebarLogo.png";

function Sidebar({ userBriefData, hasUserCode }) {
  const { installmentsCount, availableCertificates } = useContext(UserContext);

  return (
    <>
      <div className="sidebar">
        <div className="sidebar-top">
          <img
            src={userBriefData?.avatar || sidebarlogo}
            alt="sidebarlogo"
            className="sidebarlogo"
          />
          <div className="navbar-p">
            <p className="sidebarinfo-text">{userBriefData?.full_name}</p>
            <p className="student-code" style={{fontSize: "16px"}}>{userBriefData?.user_code}</p>
          </div>
        </div>
        <NavigationMenu
          installmentsCount={installmentsCount}
          availableCertificates={availableCertificates}
          hasUserCode={hasUserCode}
        />
      </div>
      <span className="sidebar-separator"></span>
    </>
  );
}

export default Sidebar;
