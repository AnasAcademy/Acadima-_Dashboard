import React, { useState, useContext } from "react";
import { apiUrl } from "../../API";
import { UserContext } from "../../Context/UserContext";
import { useNavigate, useLocation } from "react-router-dom";

import "../../Styles/SingleProgramPage/ProgramHeader.css";
import certified from "../../Images/Single Program Page/certified.svg";
import globe from "../../Images/Single Program Page/globe.svg";
import like from "../../Images/Single Program Page/like.svg";

import NavBar from "./NavBar";

// Popup Component
const Popup = ({ message, onClose }) => (
  <div className="popup-container">
    <div className="popup">
      <p>{message}</p>
      <button onClick={onClose}>إغلاق</button>
    </div>
  </div>
);

function ProgramHeader({
  program,
  appDeadline,
  durationInSemesters,
  durationInHours,
  durationDetails,
  level,
  levelDetails,
  courseLanguage,
}) {
  const { programs } = useContext(UserContext);
  // const hasBought = programs[0]?.has_bought

  const category_id =
    program?.categories?.length > 0 && program.categories[0]?.id;

  const bundle_id =
    program?.categories?.length > 0 &&
    program.categories[0]?.bundles?.length > 6
      ? program.categories[0].bundles[6]?.id
      : null;

  const data = { category_id, bundle_id };

  const navigate = useNavigate();
  const location = useLocation();
  const [errorMessage, setErrorMessage] = useState(null);

  const cyberSecurity =
    program?.categories?.length > 0 &&
    program.categories[0]?.bundles?.length > 6
      ? program.categories[0].bundles[6]
      : null;

  const applyToProgram = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login", { state: { from: location } });
      return;
    }

    try {
      const headers = {
        "Content-Type": "application/json",
        "x-api-key": "1234",
        "ngrok-skip-browser-warning": true,
        Authorization: `Bearer ${token}`,
      };

      const response = await fetch(apiUrl + "/panel/programs/apply", {
        method: "POST",
        headers,
        body: JSON.stringify(data),
      });

      let hasBought = false;
      if (programs?.length > 0) {
        hasBought = programs[0]?.has_bought || false;
      } else {
        console.log("Programs array is empty or undefined.");
      }

      const result = await response.json();

      if (!result.success && hasBought === false) {
        // Navigate if the application is successful and the program hasn't been purchased
        navigate("/finances/program");
      } else if (!result.success && hasBought) {
        // Show the popup if the program has been purchased and there are errors
        const errorDetail = "You have already purchased this program.";
        setErrorMessage(errorDetail);
      } else if (!result.success) {
        // Handle API failure
        console.log("API call failed.");
        console.log("API Errors:", result);
        const errorDetail =
          result.errors?.bundle_id?.[0] ||
          result.message ||
          "Failed to apply to the program.";
        setErrorMessage(errorDetail);
      }
    } catch (error) {
      setErrorMessage("An unexpected error occurred. Please try again.");
      console.log("Error applying to program:", error);
    }
  };

  const handleConsultantClick = () => {
    const token = localStorage.getItem("token"); // Check for the token
    if (!token) {
      // Navigate to login if no token is found
      navigate("/login", { state: { from: location } }); // Pass the current location as state
    } else {
      // Navigate to the consultant page if the token exists
      navigate("/programs/consultant");
    }
  };

  return (
    <div className="prog-header">
      <div className="nav-bar-border">
        <NavBar />
      </div>
      <div className="header-details">
        <h2 className="header-title">{cyberSecurity?.title}</h2>
        <p className="header-desc">{cyberSecurity?.description}</p>
        <div className="header-details-container">
          <div className="application-buttons-container">
            <button className="header-button-outline">
              <p className="enroll-p"> Download our 2024 curriculum</p>
            </button>
            <button className="header-button consult">
              <p className="enroll-p consult" onClick={handleConsultantClick}>
                Consult
              </p>
            </button>
            <button className="header-button" onClick={applyToProgram}>
              <p className="enroll-p"> Apply now</p>
            </button>
          </div>
          <div className="more-details">
            <div className="details-item">
              <img src={certified} alt="certified" className="icon" />
              <p>University credit-rated</p>
            </div>

            <div className="details-item">
              <img src={globe} alt="globe" className="icon" />
              <p>Online & flexible</p>
            </div>

            <div className="details-item">
              <img src={like} alt="like" className="icon" />
              <p>Secure a job in 6 months</p>
            </div>
          </div>
        </div>
      </div>

      {/* Error Popup */}
      {errorMessage && (
        <Popup message={errorMessage} onClose={() => setErrorMessage(null)} />
      )}
    </div>
  );
}

export default ProgramHeader;
