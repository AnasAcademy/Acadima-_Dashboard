import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../../Styles/Main/Navbar.css";

import AcadimaLogo from "../../Images/AcadimaLogo.png";
import notif from "../../Images/notification.svg";
import activeNotif from "../../Images/active-notification.svg";
import NavbarSidebar from "./Sidebar/NavbarSidebar";

function Navbar({ userBriefData, hasUnreadNotifications, notifications }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showNotificationPopup, setShowNotificationPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState(null);
  const [unreadNotificationId, setUnreadNotificationId] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  const handleMenuToggle = () => {
    setMenuOpen((prev) => !prev);
  };

  // Close the menu when the route changes
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  // Check for unread notifications
  useEffect(() => {
    if (notifications?.length > 0) {
      const unreadNotification = notifications.find(
        (notification) => notification.status === "unread"
      );

      if (unreadNotification) {
        setPopupMessage(unreadNotification.message || "لديك إشعار جديد!");
        setUnreadNotificationId(unreadNotification.id);
        setShowNotificationPopup(true);

        // Hide the popup after 5 seconds
        const timer = setTimeout(() => {
          setShowNotificationPopup(false);
        }, 5000);

        return () => clearTimeout(timer); // Cleanup timer on unmount
      }
    }
  }, [notifications]);

  const handleNotificationClick = () => {
    setShowNotificationPopup((prev) => !prev); // Toggle the popup manually
    // const timer = setTimeout(() => {
    //   setShowNotificationPopup(false);
    // }, 5000);
  };

  const showNotification = (notificationId) => {
    navigate(`/notifications/${notificationId}`);
  };

  return (
    <div className="navbar">
      <img src={AcadimaLogo} alt="AcadimaLogo" className="AcadimaLogo" />

      <div className="hamburger" onClick={handleMenuToggle}>
        <span className={menuOpen ? "line open" : "line"}></span>
        <span className={menuOpen ? "line open" : "line"}></span>
        <span className={menuOpen ? "line open" : "line"}></span>
      </div>

      <NavbarSidebar
        menuOpen={menuOpen}
        full_name={userBriefData?.full_name}
        user_code={userBriefData?.user_code}
        avatar={userBriefData?.avatar}
      />

      <div className={`navbar-left`}>
        {/* <p className="language-toggle">En</p> */}
        <div className="notification-wrapper">
          <img
            src={hasUnreadNotifications ? activeNotif : notif}
            alt="Notification Icon"
            className="notification-icon"
            onClick={handleNotificationClick}
          />
          {showNotificationPopup && (
            <div className="navbar-notification-dropdown">
              <ul className="navbar-notification-list">
                {notifications &&
                notifications.filter(
                  (notification) => notification.status !== "read"
                ).length > 0 ? (
                  notifications
                    .filter((notification) => notification.status !== "read")
                    .map((notification, index) => (
                      <li
                        key={index}
                        className="navbar-notification-item unread"
                        onClick={() => showNotification}
                      >
                        <div className="navbar-notification-content">
                          <p className="navbar-notification-title">
                            {notification.title}
                          </p>
                          <p className="navbar-notification-date">
                            {notification.message}
                          </p>
                        </div>
                        <p className="navbar-notification-date">
                            {notification.created_at}
                          </p>
                      </li>
                    ))
                ) : (
                  <li className="notification-item no-notifications">
                    لا توجد إشعارات جديدة
                  </li>
                )}
              </ul>

              <button
                className="view-all-notifications"
                onClick={() => navigate("/notifications")}
              >
                عرض كل الإشعارات
              </button>
            </div>
          )}
        </div>

        <span className="nav-separator"></span>
        <div className="navbar-p">
          <p className="student-name">{userBriefData?.full_name}</p>
          <p className="student-code">{userBriefData?.user_code}</p>
        </div>
        <img src={userBriefData?.avatar} alt="logo" className="logo" />
      </div>
    </div>
  );
}

export default Navbar;
