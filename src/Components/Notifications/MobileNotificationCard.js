import React, { useState } from "react";
import "../../Styles/Classes/MobileAssignmentCard.css";

function MobileNotificationCard({ onClick, selected, status,notification }) {
  return (
    <div
      className={`mobile-notification-card ${
        selected ? "mobile-notification-card-active" : ""
      }`}
    >
      <div>
        <div className="notification-header">
          <h4 className="notification-title">
            {/* Status circle indicating read/unread */}
            {notification?.title}
            <span
          className={`status-circle ${
            selected
              ? "white" // Black when selected
              : status === "unread"
              ? "red" // Red when unread
              : "white" // White when read and not selected
          }`}
        ></span>
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
        معاينة الرسالة
      </button>
    </div>
  );
}

export default MobileNotificationCard;
