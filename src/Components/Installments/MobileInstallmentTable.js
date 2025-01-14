import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiUrl } from "../../API";
import "../../Styles/Installments/Installments.css";

import dropdown from "../../Images/Chevron_Down.svg";

function MobileInstallmentTable({ order_id, step }) {
  const navigate = useNavigate();
  const [isExpanded, setIsExpanded] = useState(false); // Track whether the section is expanded

  const token = localStorage.getItem("token");

  const handlePaymentClick = async () => {
    try {
      const response = await fetch(
        `${apiUrl}/panel/financial/installments/${order_id}/steps/${step?.id}/pay`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "x-api-key": "1234",
            "ngrok-skip-browser-warning": true,
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const result = await response.json();
      if (result?.success) {
        navigate(`/payment/${result?.data?.order?.id}`);
      } else {
        console.error("Failed to process payment:", result.message);
      }
    } catch (error) {
      console.error("Error during payment:", error);
    }
  };

  return (
    <div className="installment-section">
      {/* Header for the installment */}
      <div
        className={`installment-header ${isExpanded ? "expanded" : ""}`}
        onClick={() => setIsExpanded((prev) => !prev)} // Toggle expand/collapse
      >
        <span>{step?.title}</span>
        <div className="arrow-container">
          <img
            src={dropdown}
            alt="dropdown"
            className={`course-dropdownarrow ${isExpanded ? "rotated" : ""}`}
          />
        </div>
        <span
          className={`installment-status ${
            step?.payment_status === "مدفوع" ? "paid" : "unpaid"
          }`}
        >
          {step?.payment_status === "مدفوع" ? (
            <i className="icon-check-circle"></i>
          ) : (
            <i className="icon-circle"></i>
          )}
        </span>
      </div>

      {/* Collapsible content */}
      {isExpanded && (
        <div className="installment-details">
          <div className="installment-detail-item">
            <span>المبلغ:</span>
            <span>{step?.amount} ر.س</span>
          </div>
          <div className="installment-detail-item">
            <span>نهاية القسط:</span>
            <span>{step?.deadline ?? "--"}</span>
          </div>
          <div className="installment-detail-item">
            <span>تاريخ الدفع:</span>
            <span>{step?.payment_date ?? "--"}</span>
          </div>
          <div className="installment-detail-item">
            <span>حالة عملية الدفع:</span>
            {step?.payment_status === "مدفوع" ? (
              <span className="paid">مدفوع</span>
            ) : (
              <button
                className="installment-payment-button"
                onClick={handlePaymentClick}
              >
                دفع رسوم القسط
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default MobileInstallmentTable;
