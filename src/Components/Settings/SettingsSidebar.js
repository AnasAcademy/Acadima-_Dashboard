import React from "react";
import "../../Styles/Settings/SettingsSidebar.css";

import user from "../../Images/SettingsSidebar/User.svg";
import activeuser from "../../Images/SettingsSidebar/ActiveUser.svg";

import personalinfo from "../../Images/SettingsSidebar/Personalinfo.svg";
import activepersonalinfo from "../../Images/SettingsSidebar/ActivePersonalinfo.svg";

import education from "../../Images/SettingsSidebar/education.svg";
import activeeducation from "../../Images/SettingsSidebar/Activeeducation.svg";

import extra from "../../Images/SettingsSidebar/extra.svg";
import activeextra from "../../Images/SettingsSidebar/Activeextra.svg";

import others from "../../Images/SettingsSidebar/others.svg";
import activeothers from "../../Images/SettingsSidebar/Activeothers.svg";

import others2 from "../../Images/SettingsSidebar/others2.svg";
import activeothers2 from "../../Images/SettingsSidebar/Activeothers2.svg";

function SettingsSidebar({ activeSection, setActiveSection }) {
  const sections = [
    {
      id: 1,
      title: "البيانات الأساسية",
      icon: user,
      activeIcon: activeuser, 
    },
    {
      id: 2,
      title: "البيانات الشخصية",
      icon: personalinfo,
      activeIcon:activepersonalinfo,
    },
    {
      id: 3,
      title: "التعليم",
      icon: education,
      activeIcon: activeeducation,
    },
    {
      id: 4,
      title: "الخبرات",
      icon: extra,
      activeIcon: activeextra,
    },
    {
      id: 5,
      title: "معلومات إضافية",
      icon: extra,
      activeIcon: activeextra,
    },
    {
      id: 6,
      title: "روابط الأعمال",
      icon: others,
      activeIcon: activeothers,
    },
    {
      id: 7,
      title: "المعرفون",
      icon: others2,
      activeIcon: activeothers2,
    },
  ];

  return (
    <div className="settings-sidebar-container">
      <h2 className="settings-title">جميع الإعدادات</h2>

     
      {/* <div className="progress-container">
        <div className="progress-bar-container">
          <div className="progress-bar" style={{ width: `${progress}%` }}></div>
        </div>
        <div className="progress-percentage">{progress}%</div>
      </div> */}

      <p className="settings-description">
        عزيزنا الطالب، يرجى التأكد من ملء جميع الحقول المطلوبة (المشار إليها
        بعلامة <span>*</span>) بشكل صحيح لاستلام وثيقة البرنامج.
      </p>

      {/* Section Buttons */}
      <div className="settings-sections">
        {sections.map((section) => (
          <div
            key={section.id}
            className={`settings-button ${
              activeSection === section.id ? "active" : ""
            }`}
            onClick={() => setActiveSection(section.id)}
          >
            <img className="settings-icon"
              src={activeSection === section.id ? section.activeIcon : section.icon}
              alt="activeSection"
            />
            <span className="settings-text">{section.title}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SettingsSidebar;
