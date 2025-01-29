import React, { useState, useContext, useEffect } from "react";
import { apiUrl } from "../../API";
import { UserContext } from "../../Context/UserContext";
import { useNavigate, useLocation } from "react-router-dom";
import "../../Styles/SingleProgramPage/PaymentSection.css";

import check from "../../Images/Single Program Page/offerCheck.svg";

function PaymentSection({ sectionId, programId, data }) {
  console.log("programId", programId);
  const whatCourseOffers = [
    "Personal career support",
    "Online, Part-Time",
    "98% Hiring Rate",
    "University Credit-Rated Programme",
    "Learn Groundbreaking Tech & AI Skills",
  ];

  const { singlePageProgramData, programs } = useContext(UserContext);
  let program =
    singlePageProgramData?.categories?.[0]?.bundles.find(
      (program) => program.id === Number(programId)
    ) || null;

  let hasBought = false;

  console.log("programs");  
  console.log(programs);  
  if (programs) {
    const programWithId = programs.find(
      (program) => program.id === Number(programId)
    );
    if (programWithId) {
      hasBought = programWithId.has_bought || false;
    } else {
      // console.log("No program with ID 66 found.");
    }
  } else {
    // console.log("Programs ===> ");
    // console.log(programs);    
    console.log("Programs array is empty or undefined.");
  }

  const [popupMessage, setPopupMessage] = useState(""); // Popup message state
  const [isPopupVisible, setIsPopupVisible] = useState(false); // Popup visibility state
  const [actionType, setActionType] = useState(null); // Tracks which button was clicked

  const calculateOldPrice = (newPrice, discount) => {
    if (!newPrice || !discount) return 0;
    return (newPrice / (1 - discount / 100)).toFixed(2);
  };

  const navigate = useNavigate();
  const location = useLocation();

  const token = localStorage.getItem("token");

  if (programs?.length > 0) {
    const programWithId = programs.find(
      (program) => program.id === Number(programId)
    );
    let hasBought = programWithId?.has_bought || false;
  
    // // console.log("Has bought:", hasBought);
  }  

  const applyToProgram = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login", { state: { from: location } });
      return;
    }

    try {
      const response = await fetch(apiUrl + "/panel/programs/apply", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": "1234",
          "ngrok-skip-browser-warning": true,
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (result.success || (!result.success && hasBought === false)) {        
        if (actionType === "cash") {
          handleCashClick();
        } else if (actionType === "installment") {
          handleInstallmentClick();
        }
      } else {
        setPopupMessage("You have already paid for this program.");
        setIsPopupVisible(true);
        // console.log(result);
        
        // // console.log("API call failed.");
        // // console.log("API Errors:", result);
      }
    } catch (error) {
      // console.log("Error applying to program:", error);
    }
  };

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

      if (result.success === true && hasBought === false) {
        const order_id = result?.data?.order?.id;
        navigate(`/payment/${order_id}`);
      } else if (result.success === true && hasBought === true) {
        // Show popup for already purchased program
        setPopupMessage("You have already paid for this program.");
        setIsPopupVisible(true);
      } else {
        // console.log("Error in cash payment:", result.errors);
        setPopupMessage("An error occurred. Please try again.");
        setIsPopupVisible(true);
      }
    } catch (error) {
      // console.log("Error in handleCashClick:", error);
      setPopupMessage("An unknown error occurred. Please try again.");
      setIsPopupVisible(true);
    }
  };

  function handleInstallmentClick() {
    if (!token) {
      navigate("/login", { state: { from: location } });
      return;
    } else if (hasBought === true) {
      setPopupMessage("You have already paid for this program.");
      setIsPopupVisible(true);
    } else {
      navigate("/finances/installments/conditions", {
        state: {
          program: program,
          from: location.pathname,
        },
      });
      // console.log(program);
    }
  }

  const handleButtonClick = (type) => {
    setActionType(type); // Set action type ('cash' or 'installment')
    applyToProgram(); // Always call applyToProgram first
  };

  const closePopup = () => {
    setIsPopupVisible(false);
    setPopupMessage("");
  };

  return (
    <div className="payment-section">
      {isPopupVisible && (
        <div className="popup-container">
          <div className="popup">
            <p>{popupMessage}</p>
            <button onClick={closePopup}>Close</button>
          </div>
        </div>
      )}

      <div className="heading">
        <h1 id={sectionId} className="single-program-section-title mr-auto">
          Pricing
        </h1>
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
              <span className="old-price">
                {program?.price
                  ? `${calculateOldPrice(
                      program.price,
                      program.discount || 42
                    )} $`
                  : ""}
              </span>
            </div>
          </div>
          <div className="plan-bottom">
            <div className="payment-buttons-container">
              <button
                className="register-btn"
                onClick={() => handleButtonClick("cash")}
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
              <h2 className="new-price">
                {program?.total_installment_payment} $
              </h2>
              <span className="old-price">
                {program?.total_installment_payment
                  ? `${calculateOldPrice(
                      program?.total_installment_payment,
                      program.discount || 25
                    )} $`
                  : ""}
              </span>
            </div>
          </div>
          <div className="plan-bottom">
            <div className="payment-buttons-container">
              <button
                className="register-btn"
                onClick={() => handleButtonClick("installment")}
              >
                Register Now
              </button>
              <button
                className="register-btn details-btn"
                onClick={() => navigate("/installments-conditions")}
              >
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
