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
      console.log(additionalData);
      
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
          />
        );
      case 2:
        return (
          <PersonalData
            onNext={handleNextStep}
            allUserData={allUserData}
            setAllUserData={setAllUserData}
          />
        );
      case 3:
        return <Education onNext={handleNextStep} education={education} setEducation={setEducation}/>;
      case 4:
        return <Experience onNext={handleNextStep} experience={experience} userId={allUserData.id}/>;
      case 5:
        return <Extrainfo onNext={handleNextStep} additionalData={additionalData}/>;
      case 6:
        return <WorkLinks onNext={handleNextStep} links={links} setLinks={setLinks}/>;
      case 7:
        return <PeopleYouKnow onNext={handleNextStep} references={references} setReferences={setReferences}/>;
      default:
        return navigate('/');
    }
  };

  return (
    <MainPageContainer>
      <div className="settings-container">
        <SettingsSidebar
          activeSection={activeSection}
          setActiveSection={setActiveSection}
        />
        <div className="settings-content">{renderSectionContent()}</div>
      </div>
    </MainPageContainer>
  );
}

export default Settings;
