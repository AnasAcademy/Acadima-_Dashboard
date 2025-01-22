import React from "react";
import { apiUrl } from "../../API";

import { useNavigate } from "react-router-dom";

import "../../Styles/SingleProgramPage/ProgramHeader.css";
import headerbg from "../../Images/Single Program Page/headerbg.png";
import certified from "../../Images/Single Program Page/certified.svg";
import globe from "../../Images/Single Program Page/globe.svg";
import like from "../../Images/Single Program Page/like.svg";

import NavBar from "./NavBar";

function ProgramHeader({
  title,
  desc,
  category_id, 
  bundle_id,
  appDeadline,
  durationInSemesters,
  durationInHours,
  durationDetails,
  level,
  levelDetails,
  courseLanguage,
}) {
  const data = { category_id, bundle_id };
  const navigate = useNavigate(); // Hook for navigation
  const token = localStorage.getItem("token");

  const handleEnrollClick = () => {
    window.location.href = "http://localhost:3001/finances/program"; // Redirects to the external route
  };

  const applyToProgram = async () => {
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
      const result = await response.json();

      if (result.success === true) {
        navigate("/finances/program");
      } else {
      }
    } catch (error) {
      console.error("Error applying to program:", error);
    }
  };

  const detailsHeaderStyle = {
    backgroundImage: `linear-gradient(to bottom, rgba(26, 151, 141, 0.05) 85%, rgba(0, 0, 0, 0.9)), url(${headerbg}), 
                        linear-gradient(to right, rgba(26, 151, 141, 0.02)  60%, rgba(0, 0, 0, 0.9)), url(${headerbg})`,
    height: "919px",
    width: "1920 px",
    backgroundSize: "cover",
    backgroundPosition: "top",
    backgroundRepeat: "no-repeat",
    // padding: '40px',
  };

  return (
    <div className="prog-header" style={detailsHeaderStyle}>
      <div className="nav-bar-border">
        <NavBar />
      </div>
      <div className="header-details">
        <h2 className="header-title">{title}</h2>
        <p className="header-desc">{desc}</p>
        <div className="header-details-container">
          <div className="application-buttons-container">
            <button
              className="header-button-outline"
              onClick={handleEnrollClick}
            >
              <p className="enroll-p"> Download our 2024 curriculum</p>
            </button>
            <button className="header-button" onClick={handleEnrollClick}>
              <p className="enroll-p" onClick={applyToProgram}>
                Apply now
              </p>
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

        {/* <div className='course-details'>
                    <div className='details-section'>
                        <p className='detail-title'>{durationInSemesters} semesters</p>
                        <p className='detail-desc'>Lorem ipsum dolor sit</p>
                    </div>

                    <div className='details-section'>
                        <p className='detail-title'>{durationInHours} hours</p>
                        <p className='detail-desc'>{durationDetails}</p>
                    </div>

                    <div className='details-section'>
                        <p className='detail-title'>{level} level</p>
                        <p className='detail-desc'>{levelDetails}</p>
                    </div>

                    <div className='details-section'>
                        <p className='detail-title'>course language</p>
                        <p className='detail-desc'>{courseLanguage}</p>
                    </div>

                    <div className='details-section'>
                        <p className='detail-title'>course system</p>
                        <p className='detail-desc'>flexible  online lessons</p>
                    </div>
                </div> */}
      </div>
    </div>
  );
}

export default ProgramHeader;
