import React from "react";
import '../../Styles/Services/Services.css';

import serviceLogo from '../../Images/Sidebar icons/sidebarLogo.png';

function ServiceCard({ title, description, price }) {
  const displayPrice = price === 0 ? "مجاني" : `${price} ريال سعودي`;

  return (
    <div className="service-card">
      <div className="service-top">
        <img src={serviceLogo} alt="serviceLogo" className="service-logo" />
        <h2 className="service-title">{title}</h2>
      </div>
      <p className="service-description">{description}</p>
      <div className="service-footer">
        <span className="service-price">{displayPrice}</span>
        <button className="service-button">تقديم طلب</button>
      </div>
    </div>
  );
}

export default ServiceCard;
