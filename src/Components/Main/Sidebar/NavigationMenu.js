import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../../../Styles/Main/Sidebar.css";

import LogoutButton from "../LogoutButton";

import dashboard from "../../../Images/Sidebar icons/dashboard.png";
import Activedashboard from "../../../Images/Sidebar icons/activeIcons/Activedashboard.png";

import admission from "../../../Images/Sidebar icons/admission.png";
import Activeadmission from "../../../Images/Sidebar icons/activeIcons/Activeadmission.png";

import classes from "../../../Images/Sidebar icons/classes.png";
import Activeclasses from "../../../Images/Sidebar icons/activeIcons/Activeclasses.png";

import certificates from "../../../Images/Sidebar icons/certificate.png";
import Activecertificates from "../../../Images/Sidebar icons/activeIcons/Activecertificate.png";

import payment from "../../../Images/Sidebar icons/payment.svg";
import Activepayment from "../../../Images/Sidebar icons/activeIcons/Activepayment.svg";

import ActiveInstallments from '../../../Images/Sidebar icons/activeIcons/ActiveInstallments.svg';
import installments from "../../../Images/Sidebar icons/installments.svg";

import ActivePay from '../../../Images/Sidebar icons/activeIcons/ActivePay.svg';
import pay from "../../../Images/Sidebar icons/pay.svg";

import notifications from "../../../Images/Sidebar icons/notifications.png";
import Activenotifications from "../../../Images/Sidebar icons/activeIcons/Activenotification.png";

import schedule from "../../../Images/Sidebar icons/schedule.png";
import Activeschedule from "../../../Images/Sidebar icons/activeIcons/Activeschedule.png";

import settings from "../../../Images/Sidebar icons/settings.png";
import Activesettings from "../../../Images/Sidebar icons/activeIcons/Activesettings.png";

function NavigationMenu({ installmentsCount }) {
  const navigate = useNavigate();
  const location = useLocation();

  // State to track which dropdown is open
  const [openDropdown, setOpenDropdown] = useState(null);

  // Automatically keep the dropdown open if the route matches any of its children
  useEffect(() => {
    menuItems.forEach((item) => {
      if (
        item.hasDropdown &&
        item.children.some((child) => child.route === location.pathname)
      ) {
        setOpenDropdown(item.label);
      }
    });
  }, [location.pathname]);

  const toggleDropdown = (label) => {
    // Toggle the dropdown for the clicked parent item
    setOpenDropdown((prev) => (prev === label ? null : label));
  };

  const menuItems = [
    { defaultIcon: dashboard, activeIcon: Activedashboard, label: "الرئيسية", route: "/" },
    { defaultIcon: admission, activeIcon: Activeadmission, label: "القبول و التسجيل", route: "/admission" },
    { defaultIcon: classes, activeIcon: Activeclasses, label: "المقررات الدراسية", route: "/classes" },
    {
      defaultIcon: payment,
      activeIcon: Activepayment,
      label: "المالية",
      hasDropdown: true,
      route: '/finances',
      children: [
        // Conditionally include this menu item
        ...(installmentsCount > 0
          ? [{ defaultIcon: pay, activeIcon: ActivePay, label: "الأقساط", route: "/finances/installments" },]
          : []),
          { defaultIcon: installments, activeIcon: ActiveInstallments, label: "دفع رسوم البرنامج", route: "/finances/program" }
        
      ],
    },
    { defaultIcon: certificates, activeIcon: Activecertificates, label: "الشهادات", route: "/certificates" },
    { defaultIcon: notifications, activeIcon: Activenotifications, label: "الاشعارات", route: "/notifications" },
    // { defaultIcon: schedule, activeIcon: Activeschedule, label: "الخدمات الإلكترونية", route: "/services" },
    { defaultIcon: settings, activeIcon: Activesettings, label: "الإعدادات", route: "/settings" },
  ];

  return (
    <ul className="navigation-menu">
      {menuItems.map((item, index) => (
        <React.Fragment key={index}>
          <li
            className={`menu-item ${location.pathname === item.route ? "active" : ""}`}
            onClick={() => {
              if (item.hasDropdown) {
                toggleDropdown(item.label); // Pass unique identifier for the dropdown
              } else {
                navigate(item.route);
              }
            }}
          >
            <img
              src={location.pathname === item.route ? item.activeIcon : item.defaultIcon}
              alt={item.label}
              className="sidebar-icon"
            />
            <span>{item.label}</span>
          </li>
          {item.hasDropdown && openDropdown === item.label && (
            <ul className="dropdown-menu">
              {item.children.map((child, childIndex) => (
                <li
                  key={childIndex}
                  className={`menu-item ${location.pathname === child.route ? "active" : ""}`}
                  onClick={() => navigate(child.route)}
                >
                  <img
                    src={location.pathname === child.route ? child.activeIcon : child.defaultIcon}
                    alt={child.label}
                    className="sidebar-icon"
                  />
                  <span>{child.label}</span>
                </li>
              ))}
            </ul>
          )}
        </React.Fragment>
      ))}
      <LogoutButton />
    </ul>
  );
}

export default NavigationMenu;
