import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "../Context/UserContext";
import { useNavigate, useParams } from "react-router-dom";
import { apiUrl } from "../API";
import "../Styles/Notifications/Notifications.css";

import NotificationCard from "../Components/Notifications/NotificationCard";
import msg from "../Images/msg.svg";
import MobileNotificationCard from "../Components/Notifications/MobileNotificationCard";

function Notifications() {
  const { notifications, fetchNotifications } = useContext(UserContext);
  const [selectedNotificationId, setSelectedNotificationId] = useState(null);
  const { notification_id } = useParams(); // Get notification_id from the URL
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  // Mark notification as seen
  const markAsSeen = async (notificationId) => {
    try {
      const notification = notifications.find((n) => n.id === notificationId);
  
      // Check if notification is already marked as seen
      if (notification && notification.status === "unread") {
        await fetch(`${apiUrl}/panel/notifications/${notificationId}/seen`, {
          method: "POST",
          headers: {
            "x-api-key": "1234",
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
          },
        });
  
        fetchNotifications(); // Refresh notifications
      }
  
      // Navigate to the selected notification's URL
      navigate(`/notifications/${notificationId}`);
    } catch (error) {
      console.error("Error marking notification as seen:", error);
    }
  };

  function extractPlainText(html) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");
    return doc.body.textContent || "";
  }
  

  // Automatically mark the notification as seen if notification_id exists in the URL
  useEffect(() => {
    if (notification_id) {
      const id = Number(notification_id);
      setSelectedNotificationId(id); // Automatically select notification from URL
      markAsSeen(id); // Mark the notification as seen
    }
  }, [notification_id]);

  const selectedNotification = notifications.find(
    (notification) => notification.id === selectedNotificationId
  );

  return (
    <>
      <div className="notifications-container">
        <div className="notifications-wide-screen-view">
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
                  {extractPlainText(selectedNotification.message)}
                  </span>
                </div>
              </div>
            ) : (
              <div className="notification-default-view">
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
                key={notification.id}
                status={notification.status} // Pass status to NotificationCard
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
