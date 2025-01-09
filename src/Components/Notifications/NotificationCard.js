import React from "react";
import "../../Styles/Notifications/Notifications.css";

function NotificationCard({ title, date, status, onClick, selected }) {
  return (
    <div
      className={`notification-card ${
        selected ? "notification-card-active" : ""
      }`}
    >
      <div className="notification-header">
        {/* Status circle indicating read/unread */}
        <span
          className={`status-circle ${
            selected
              ? "black" // Black when selected
              : status === "unread"
              ? "red" // Red when unread
              : "white" // White when read and not selected
          }`}
        ></span>
        
        {/* Notification title */}
        <h4 className="notification-title">{title}</h4>
      </div>
      
      {/* Notification date */}
      <span className="notification-date">{date}</span>
      
      {/* Button to mark as seen */}
      <button className="notification-button" onClick={onClick}>
        معاينة الرسالة
      </button>
    </div>
  );
}

export default NotificationCard;
