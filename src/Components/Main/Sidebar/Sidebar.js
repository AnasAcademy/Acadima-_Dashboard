import React, { useState, useEffect } from "react";
import { apiUrl } from "../../../API";
import "../../../Styles/Main/Sidebar.css";

import NavigationMenu from "./NavigationMenu";

import sidebarlogo from "../../../Images/Sidebar icons/sidebarLogo.png";

function Sidebar() {
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
      // console.log(result);
      setUserBriefData(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);
  return (
    <>
      <div className="sidebar">
        <img src={userBriefData?.avatar} alt="sidebarlogo" className="sidebarlogo" />
        <NavigationMenu />
      </div>
      <span className="sidebar-separator"></span>
    </>
  );
}

export default Sidebar;
