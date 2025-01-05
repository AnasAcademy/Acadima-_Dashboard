import React from "react";
import "../../Styles/Notifications/Notifications.css";
import { da } from "date-fns/locale";

function NotificationCard({ title, date, description, onClick, selected }) {
  console.log(date);
  
  return (
    <div
      className={`notification-card ${selected ? "notification-card-active" : ""}`}
    >
      <div className="notification-header">
        <h4 className="notification-title"><span className="dot"></span>{title}</h4>
        <span className="notification-date">{date}</span>
      </div>
      {/* <p className="notification-description">{description}</p> */}
      <button className="notification-button" onClick={onClick}>معاينة الرسالة</button>
    </div>
  );
}

export default NotificationCard;
