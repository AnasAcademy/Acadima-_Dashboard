import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiUrl } from "../../API";
import "../../Styles/Installments/Installments.css";

function MobileInstallmentTable({ order_id, step }) {
  const navigate = useNavigate();
  const [isExpanded, setIsExpanded] = useState(false); // Track whether the section is expanded

  const token = localStorage.getItem("token");

  const handlePaymentClick = async () => {
    try {
      const response = await fetch(
        apiUrl +
          "/panel/financial/installments/" +
          order_id +
          "/steps/" +
          step?.id +
          "/pay",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "x-api-key": "1234",
            "ngrok-skip-browser-warning": true,
            Authorization: "Bearer " + token,
          },
        }
      );

      const result = await response.json();
      console.log(result);
      if (result?.success === true) {
        navigate("/payment/" + result?.data?.order?.id);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="installment-section">
      {/* Header for the installment */}
      <div
        className={`installment-header ${isExpanded ? "expanded" : ""}`}
        onClick={() => setIsExpanded(!isExpanded)} // Toggle expand/collapse
      >
        <span>{step?.title}</span>
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
            <span
              className={`installment-status ${
                step?.payment_status === "مدفوع" ? "paid" : "unpaid"
              }`}
            >
              {step?.payment_status === "مدفوع" ? (
                "مدفوع"
              ) : (
                <button className="installment-payment-button" onClick={handlePaymentClick}>
                  دفع رسوم القسط
                </button>
              )}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

export default MobileInstallmentTable;
