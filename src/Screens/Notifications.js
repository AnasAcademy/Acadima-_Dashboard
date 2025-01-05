import React, { useState, useEffect } from "react";
import { apiUrl } from "../API";
import "../Styles/Notifications/Notifications.css";

import MainPageContainer from "../Components/Main/MainPageContainer";
import NotificationCard from "../Components/Notifications/NotificationCard";

import msg from "../Images/msg.svg";

function Notifications() {
  const [notifications, setNotifications] = useState([]);
  const [selectedNotificationId, setSelectedNotificationId] = useState(null);

  const selectedNotification = notifications.find(
    (notification) => notification.id === selectedNotificationId
  );

  const token = localStorage.getItem("token");

  const fetchNotifications = async () => {
    try {
      const response = await fetch(apiUrl + "/panel/notifications", {
        method: "GET",
        headers: {
          "x-api-key": "1234",
          "ngrok-skip-browser-warning": true,
          Authorization: "Bearer " + token,
        },
      });

      const result = await response.json();
      setNotifications(result?.data?.notifications || []);
      console.log(result?.data?.notifications);
      
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  };

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
      setNotifications((prevNotifications) =>
        prevNotifications.map((notification) =>
          notification.id === notificationId
            ? { ...notification, status: "read" }
            : notification
        )
      );
    } catch (error) {
      console.error("Error marking notification as seen:", error);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  return (
    <>
      <div className="notifications-container">
        <div className="notifications-content">
          <h2 className="notifications-title">الإشعارات</h2>
          <div className="notifications-list">
            {notifications.map((notification) => (
              <NotificationCard
                key={notification.id}
                title={notification.title}
                date={notification.created_at} // Use `created_at` for date
                description={notification.message} // Use `message` for description
                onClick={() => markAsSeen(notification.id)} // Pass the ID to `markAsSeen`
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
    </>
  );
}

export default Notifications;
