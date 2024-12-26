import React from "react";
import "../../Styles/Notifications/Notifications.css";

function NotificationCard({ title, date, description, onClick, selected }) {
  return (
    <div
      className={`notification-card ${selected ? "notification-card-active" : ""}`}
    >
      <div className="notification-header">
        <h4 className="notification-title">{title}</h4>
        <span className="notification-date">{date}</span>
      </div>
      <p className="notification-description">{description}</p>
      <button className="notification-button" onClick={onClick}>معاينة الرسالة</button>
    </div>
  );
}

export default NotificationCard;
