import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiUrl } from "../../API";

import "../../Styles/Main/LogoutButton.css";

import logout from "../../Images/Sidebar icons/logout.svg";

function LogoutButton() {
  const [showConfirmation, setShowConfirmation] = useState(false); // State to control modal visibility
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = async () => {
    try {
      const response = await fetch(apiUrl + "/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": "1234",
          "ngrok-skip-browser-warning": true,
          Authorization: "Bearer " + token,
        },
      });

      const result = await response.json();
      localStorage.removeItem("token");
      window.location.href = "/login";

      if (result?.status === 200) {
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="logout-button" onClick={() => setShowConfirmation(true)}>
        <img src={logout} alt="logout" className="logout" />
        <p className="logout-button-text">تسجيل الخروج</p>
      </div>

      {showConfirmation && (
        <div className="popup-container">
          <div className="popup">
            <p>هل أنت متأكد من الخروج؟</p>
            <div className="logout-buttons-container">
              <button onClick={handleLogout}>نعم</button>
              <button onClick={() => setShowConfirmation(false)}>لا</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default LogoutButton; 