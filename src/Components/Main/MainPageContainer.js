import React, { useContext, useState } from "react";
import "../../Styles/Main/MainPageContainer.css";

import { UserContext } from "../../Context/UserContext"; // Import UserContext
import Navbar from "../Main/Navbar";
import Sidebar from "../Main/Sidebar/Sidebar";
import { Outlet } from "react-router-dom";

function MainPageContainer() {
  const [menuOpen, setMenuOpen] = useState(false); // Sidebar toggle state
  const { userBriefData } = useContext(UserContext); // Consume userBriefData from context

  // Function to toggle the sidebar
  const handleMenuToggle = () => {
    setMenuOpen((prev) => !prev);
  };

  return (
    <div className="main-page">
      {/* Navbar */}
      <Navbar
        menuOpen={menuOpen}
        onMenuToggle={handleMenuToggle}
        userBriefData={userBriefData} // Pass user brief data to Navbar
      />

      {/* Main container for sidebar and content */}
      <div className="main-container">
        <Sidebar
          menuOpen={menuOpen}
          userBriefData={userBriefData} // Pass user brief data to Sidebar
        />
        <div className="main-content">
          <Outlet /> {/* Renders child components */}
        </div>
      </div>
    </div>
  );
}

export default MainPageContainer;
