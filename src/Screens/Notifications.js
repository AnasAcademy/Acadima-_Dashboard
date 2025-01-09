import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "../Context/UserContext";
import { apiUrl } from "../API";
import "../Styles/Notifications/Notifications.css";

import MainPageContainer from "../Components/Main/MainPageContainer";
import NotificationCard from "../Components/Notifications/NotificationCard";

import msg from "../Images/msg.svg";
import MobileNotificationCard from "../Components/Notifications/MobileNotificationCard";

function Notifications() {
  const { notifications, fetchNotifications } = useContext(UserContext);
  const [selectedNotificationId, setSelectedNotificationId] = useState(null);

  const selectedNotification = notifications.find(
    (notification) => notification.id === selectedNotificationId
  );

  const token = localStorage.getItem("token");

  const markAsSeen = async (notificationId) => {
    try {
      // Send API request to mark notification as seen
      await fetch(`${apiUrl}/panel/notifications/${notificationId}/seen`, {
        method: "POST",
        headers: {
          "x-api-key": "1234",
          "ngrok-skip-browser-warning": true,
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      });

      // Update the selected notification
      setSelectedNotificationId(notificationId);

      // Update the notification's status in the UI
      fetchNotifications();
    } catch (error) {
      console.error("Error marking notification as seen:", error);
    }
  };

  return (
    <>
      <div className="notifications-container">
        <div className="wide-screen-view">
          <div className="notifications-content">
            <h2 className="notifications-title">الإشعارات</h2>
            <div className="notifications-list">
              {notifications.map((notification) => (
                <NotificationCard
                  key={notification.id}
                  title={notification.title}
                  date={notification.created_at}
                  description={notification.message}
                  status={notification.status} // Pass status to NotificationCard
                  onClick={() => markAsSeen(notification.id)}
                  selected={selectedNotificationId === notification.id}
                />
              ))}
            </div>
          </div>
          <div className="chosen-notification-container">
            {selectedNotification ? (
              <div className="chosen-notification-details">
                <div className="chosen-notification-top">
                  <h3 className="chosen-notification-title">
                    {selectedNotification.title}
                  </h3>
                  <span className="chosen-notification-date">
                    {selectedNotification.created_at}
                  </span>
                </div>
                <div className="chosen-notification-bottom">
                  <span className="chosen-notification-description">
                    {selectedNotification.message}
                  </span>
                </div>
              </div>
            ) : (
              <div className="default-view">
                <img src={msg} alt="Message Icon" className="msg-icon" />
                <p className="default-text">اختر رسالة للمعاينة</p>
              </div>
            )}
          </div>
        </div>
        <div className="mobile-screen-view">
          <h2 className="notifications-title">الإشعارات</h2>
          <div className="notifications-list">
            {notifications.map((notification) => (
              <MobileNotificationCard
                notification={notification} // Use `message` for description
                onClick={() => markAsSeen(notification.id)} // Pass the ID to `markAsSeen`
                selected={selectedNotificationId === notification.id}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Notifications;
