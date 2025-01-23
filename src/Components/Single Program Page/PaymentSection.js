import React, { useState, useContext } from "react";
import { apiUrl } from "../../API";
import { UserContext } from "../../Context/UserContext";
import { useNavigate, useLocation } from "react-router-dom";
import "../../Styles/SingleProgramPage/PaymentSection.css";

import check from "../../Images/Single Program Page/offerCheck.svg";

function PaymentSection({sectionId}) {
  const whatCourseOffers = [
    "Personal career support",
    "Online, Part-Time",
    "98% Hiring Rate",
    "University Credit-Rated Programme",
    "Learn Groundbreaking Tech & AI Skills",
  ];
  const { programs } = useContext(UserContext);

  let program = [];
  if (programs?.length > 0) {
    program = programs[3];
  } else {
  } 
  

  const navigate = useNavigate();
  const location = useLocation();
  
  const token = localStorage.getItem("token");

  const handleCashClick = async () => {
    if (!token) {
      navigate("/login", { state: { from: location } });
      return;
    }
    try {
      const response = await fetch(apiUrl + "/panel/programs/purchase", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": "1234",
          "ngrok-skip-browser-warning": true,
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify({ item_id: program?.id }),
      });

      const result = await response.json();

      if (result.success === true) {
        const order_id = result?.data?.order?.id;
        navigate(`/payment/${order_id}`);
      } else {
        console.log("Error in cash payment:", result.errors);
      }
    } catch (error) {
      console.log("Error in handleCashClick:", error);
    }
  };

  function handleInstallmentClick() {
    if (!token) {
      navigate("/login", { state: { from: location } });
      return;
    }
    navigate("/finances/installments/conditions", {
      state: {
        program: program,
      },
    });
  }

  return (
    <div className="payment-section">
      <div className="heading">
        <h1 id={sectionId} className="single-program-section-title mr-auto">Pricing</h1>
        <h2 className="payment-section-title">Invest in yourself</h2>
        <p className="payment-section-desc">
          with a payment plan that works for you
        </p>

        <div className="what-course-offers">
          <p
            className="payment-section-desc"
            style={{ fontWeight: "500", textAlign: "left" }}
          >
            What the course offers:
          </p>
          <div className="what-course-offers-grid">
            {whatCourseOffers.map((offer, index) => (
              <p key={index} className="offer-item">
                <img src={check} alt="check" className="check" />
                {offer}
              </p>
            ))}
          </div>
          <button className="avg-salary">
            Your potential average salary per year → €50k+
          </button>
        </div>
      </div>

      <div className="plans">
        <div className="plan">
          <div className="plan-top">
            <h3 className="plan-title">Full Payment</h3>
            <p className="plan-desc">Best value, pay upfront</p>
            <div className="discount">42%</div>
            <div className="price">
              <h2 className="new-price">{program?.price} $</h2>
              <span className="old-price">6,394 SAR</span>
            </div>
          </div>
          <div className="plan-bottom">
            <div className="payment-buttons-container">
              <button
                className="register-btn"
                onClick={() => handleCashClick()}
              >
                Register Now
              </button>
            </div>
            <p className="note">Fees are inclusive of VAT</p>
          </div>
        </div>

        <div className="plan">
          <div className="plan-top">
            <h3 className="plan-title">Installment Payment</h3>
            <p className="plan-desc">Flexible payments for your budget.</p>
            <div className="discount">25%</div>
            <div className="price">
              <h2 className="new-price">{program?.installment_plan?.upfront}</h2>
              <span className="old-price">6,394 SAR</span>
            </div>
          </div>
          <div className="plan-bottom">
            <div className="payment-buttons-container">
              <button
                className="register-btn"
                onClick={handleInstallmentClick}
              >
                Register Now
              </button>
              <button className="register-btn details-btn">
                View installment details
              </button>
            </div>
            <p className="note">Fees are inclusive of VAT</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PaymentSection;
