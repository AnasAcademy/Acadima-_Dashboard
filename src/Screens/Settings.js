import React, { useState, useEffect } from "react";
import { apiUrl } from "../API";
import { useNavigate } from "react-router-dom";
import "../Styles/Settings/Settings.css";

import MainPageContainer from "../Components/Main/MainPageContainer";
import SettingsSidebar from "../Components/Settings/SettingsSidebar";

import BasicData from "../Components/Settings/BasicData";
import PersonalData from "../Components/Settings/PersonalData";
import Education from "../Components/Settings/Education";
import Experience from "../Components/Settings/Experience";
import Extrainfo from "../Components/Settings/Extrainfo";
import WorkLinks from "../Components/Settings/WorkLinks";
import PeopleYouKnow from "../Components/Settings/PeopleYouKnow";

function Settings() {
  const [activeSection, setActiveSection] = useState(1); // Active section state
  const [progressData, setProgressData] = useState({
    basicData: 0,
    personalData: 0,
    education: 0,
    experience: 0,
    additionalInfo: 0,
    workLinks: 0,
    references: 0,
  });

  const updateTabProgress = (tabName, progress) => {
    setProgressData((prev) => ({ ...prev, [tabName]: progress }));
  };

  const calculateOverallProgress = () => {
    const totalTabs = Object.keys(progressData).length;
    const totalProgress = Object.values(progressData).reduce(
      (sum, progress) => sum + progress,
      0
    );
    return Math.round(totalProgress / totalTabs);
  };

  const handleNextStep = () => {
    setActiveSection((prevSection) => prevSection + 1); // Move to the next section
  };

  const [allUserData, setAllUserData] = useState({});
  const [education, setEducation] = useState({});
  const [experience, setExperience] = useState({});
  const [additionalData, setAdditionalData] = useState({});
  const [links, setLinks] = useState({});
  const [references, setReferences] = useState({});

  const token = localStorage.getItem("token");
  const fetchAllUserData = async () => {
    try {
      const response = await fetch(apiUrl + "/profile", {
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
      setAllUserData(result.data);
      setEducation(result.data.education);
      setExperience(result.data.experience);
      setAdditionalData(result.data.additional_details);
      setLinks(result.data.links);
      setReferences(result.data.references);

      
      setProgressData(
        {
          basicData: 0,
          personalData: 0,
          education: 0,
          experience: 0,
          additionalInfo: 0,
          workLinks: 0,
          references: 0,
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAllUserData();
  }, []);

  const navigate = useNavigate();

  const renderSectionContent = () => {
    switch (activeSection) {
      case 1:
        return (
          <BasicData
            onNext={handleNextStep}
            allUserData={allUserData}
            setAllUserData={setAllUserData}
            updateProgress={(progress) =>
              updateTabProgress("basicData", progress)
            }
          />
        );
      case 2:
        return (
          <PersonalData
            onNext={handleNextStep}
            allUserData={allUserData}
            setAllUserData={setAllUserData}
            updateProgress={(progress) =>
              updateTabProgress("personalData", progress)
            }
          />
        );
      case 3:
        return (
          <Education
            onNext={handleNextStep}
            education={education}
            setEducation={setEducation}
            updateProgress={(progress) =>
              updateTabProgress("education", progress)
            }
          />
        );
      case 4:
        return (
          <Experience
            onNext={handleNextStep}
            experience={experience}
            userId={allUserData.id}
            updateProgress={(progress) =>
              updateTabProgress("experience", progress)
            }
          />
        );
      case 5:
        return (
          <Extrainfo
            onNext={handleNextStep}
            additionalData={additionalData}
            updateProgress={(progress) =>
              updateTabProgress("additionalInfo", progress)
            }
          />
        );
      case 6:
        return (
          <WorkLinks
            onNext={handleNextStep}
            links={links}
            setLinks={setLinks}
            updateProgress={(progress) => updateTabProgress("workLinks", progress)}
          />
        );
      case 7:
        return (
          <PeopleYouKnow
            onNext={handleNextStep}
            references={references}
            setReferences={setReferences}
            updateProgress={(progress) => updateTabProgress("references", progress)}
          />
        );
      default:
        return navigate("/");
    }
  };

  return (
    <>
      <div className="settings-container">
        <SettingsSidebar
          activeSection={activeSection}
          setActiveSection={setActiveSection}
          progress={calculateOverallProgress()} // Pass the overall progress
        />
        <div className="settings-content">{renderSectionContent()}</div>
      </div>
    </>
  );
}

export default Settings;
