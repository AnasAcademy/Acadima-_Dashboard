import React from "react";
import { useNavigate } from "react-router-dom";
import { apiUrl } from "../../API";
import "../../Styles/Installments/Installments.css";

function InstallmentTable({ id, order_id, step, program }) {
  const navigate = useNavigate();

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
      console.log(result);
      if (result?.success === true) {
        navigate(`/payment/${result?.data?.order?.id}`, {
          state: { from: "/finances/installments" },
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleInstallmentPayment = async () => {
    try {
      const response = await fetch(
        `${apiUrl}/panel/programs/purchase`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-api-key": "1234",
            "ngrok-skip-browser-warning": true,
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ item_id: program?.orderItem?.id }),
        }
      );

      const result = await response.json();
      if (result.success === true) {
        let order_id = result?.data?.order?.id;
        navigate(`/payment/${order_id}`, {
          state: { from: "/finances/installments" },
        });
      } else {
        console.log("API Error:", result);
      }
    } catch (error) {
      console.log("Error in handleInstallmentPayment:", error);
    }
  };

  const handleButtonClick = () => {
    if (program?.upfront?.payment_status === "Unpaid") {
      handleInstallmentPayment();
    } else {
      handlePaymentClick();
    }
  };

  return (
    <div className="installment-data">
      <span className="installment-data-item">{id}</span>
      <span className="installment-data-item">
        {step?.title === "upfront" ? "القسط الأول" : step?.title}
      </span>
      <span className="installment-data-item">{step?.amount} $</span>
      <span className="installment-data-item">{step?.deadline ?? "--"}</span>
      <span className="installment-data-item">{step?.payment_date}</span>
      <button
        className={`payment-status-button ${
          step?.payment_status === "Paid" ? "paid" : "unpaid"
        }`}
        onClick={handleButtonClick} // Decide which handler to execute
      >
        {step?.payment_status === "Paid" ? "مدفوع" : "الدفع"}
      </button>
    </div>
  );
}

export default InstallmentTable;