import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../Context/UserContext";
import "../Styles/Settings/Settings.css";

import SettingsSidebar from "../Components/Settings/SettingsSidebar";

import BasicData from "../Components/Settings/BasicData";
import PersonalData from "../Components/Settings/PersonalData";
import Education from "../Components/Settings/Education";
import Experience from "../Components/Settings/Experience";
import Extrainfo from "../Components/Settings/Extrainfo";
import WorkLinks from "../Components/Settings/WorkLinks";
import PeopleYouKnow from "../Components/Settings/PeopleYouKnow";

function Settings() {
  const { progressData, allUserSettingsData, setProgressData, setAllUserSettingsData } = useContext(UserContext);
  const [activeSection, setActiveSection] = useState(1); // Active section state
  

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

  const [education, setEducation] = useState({});
  const [experience, setExperience] = useState({});
  const [additionalData, setAdditionalData] = useState({});
  const [links, setLinks] = useState({});
  const [references, setReferences] = useState({});

  
  useEffect(() => {
    if (allUserSettingsData) {
      setEducation(allUserSettingsData.education || {});
      setExperience(allUserSettingsData.experience || {});
      setAdditionalData(allUserSettingsData.additional_details || {});
      setLinks(allUserSettingsData.links || {});
      setReferences(allUserSettingsData.references || {});
    }
  }, [allUserSettingsData]);
 
  const navigate = useNavigate();

  const renderSectionContent = () => {
    switch (activeSection) {
      case 1:
        return (
          <BasicData
            onNext={handleNextStep}
            allUserData={allUserSettingsData}
            setAllUserData={setAllUserSettingsData}
            updateProgress={(progress) =>
              updateTabProgress("basicData", progress)
            }
          />
        );
      case 2:
        return (
          <PersonalData
            onNext={handleNextStep}
            allUserData={allUserSettingsData}
            setAllUserData={setAllUserSettingsData}
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
            userId={allUserSettingsData.id}
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
