import React, { useState } from "react";
import "../../Styles/Classes/MobileAssignmentCard.css";

function MobileNotificationCard({ onClick, selected, notification }) {
  return (
    <div
      className={`mobile-notification-card ${
        selected ? "mobile-notification-card-active" : ""
      }`}
    >
      <div>
        <div className="notification-header">
          <h4 className="notification-title">
            <span className="dot"></span>
            {notification?.title}
          </h4>
          <span className="notification-date">{notification?.created_at}</span>
        </div>
      </div>
      {selected && (
        <span className="mobile-chosen-notification-description">
          {notification.message}
        </span>
      )}
      <button className="notification-button" onClick={onClick}>
        {selected ? "إغلاق الرسالة" : "معاينة الرسالة"}
      </button>
    </div>
  );
}

export default MobileNotificationCard;
