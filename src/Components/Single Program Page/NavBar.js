import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../../Styles/SingleProgramPage/NavBar.css";
import { addRouteToHistory } from "../../Context/RouteHistory";
import logo from "../../Images/Single Program Page/image1.png";

function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false); // State to toggle the menu
  const navigate = useNavigate(); // Hook for navigation
  const location = useLocation();

  const [hasToken, setHasToken] = useState(false);
  const token = localStorage.getItem("token");

  useEffect(() => {
    addRouteToHistory(location.pathname); // Track route changes
  }, [location]);

  useEffect(() => {
    setHasToken(token !== null);
  }, [token]);

  const handleLoginClick = () => {
    navigate("/login", { state: { from: location } });
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen); // Toggle the menu state
  };

  return (
    <div className="single-program-navBar">
      <img src={logo} alt="logo" className="single-program-Acadima-logo" />

      {/* Hamburger Menu */}
      <div className="single-program-hamburger" onClick={toggleMenu}>
        <span></span>
        <span></span>
        <span></span>
      </div>

      {/* Menu Items */}
      <ul className={`single-program-menu ${menuOpen ? "show" : ""}`}>
        <li className="single-program-nav-bar-item">Home</li>
        <li className="single-program-nav-bar-item">About us</li>
        <li className="single-program-nav-bar-item">Programs</li>
        <li className="single-program-nav-bar-item">Blogs</li>
        <li className="single-program-nav-bar-item">Contact</li>
        <div className="single-prgram-login-button">
          <button className="single-program-login mobile-button">
          {hasToken ? "Dashboard" : "Login LMS"}
          </button>
        </div>
      </ul>

      {/* Login Button */}
      <div className="single-prgram-login-button" onClick={handleLoginClick}>
        <button className="single-program-login">
          {hasToken ? "Dashboard" : "Login LMS"}
        </button>
      </div>
    </div>
  );
}

export default NavBar;
