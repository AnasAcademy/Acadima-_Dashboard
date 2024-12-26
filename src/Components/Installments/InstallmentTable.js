import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { apiUrl } from "../../API";
import "../../Styles/Installments/Installments.css";

function InstallmentTable({ id, order_id, step }) {
  const navigate = useNavigate();

  
  
  const token = localStorage.getItem("token");

  const handlePaymentClick = async () => {
    try {
      const response = await fetch(apiUrl + "/panel/financial/installments/"+ order_id + "/steps/" + step?.id + "/pay", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": "1234",
          "ngrok-skip-browser-warning": true,
          Authorization:
            "Bearer " + token,
        },
        
      });

      const result = await response.json();
      console.log(result);
      if(result?.success === true) {
        // alert(result.message);
        navigate("/payment/" + result?.data?.order?.id);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    // handlePaymentClick();
  }, []);

  return (
    <div className="installment-data">
      <span className="installment-data-item">{id}</span>
      <span className="installment-data-item">{step?.title}</span>
      <span className="installment-data-item">{step?.amount} ر.س</span>
      <span className="installment-data-item">{step?.deadline ?? '--'}</span>
      <span className="installment-data-item">{step?.payment_date}</span>
      <button
        className={`payment-status-button ${
          step?.payment_status === "مدفوع" ? "paid" : "unpaid"
        }`}
        onClick={handlePaymentClick} // Navigate on button click
      >
        {step?.payment_status === "مدفوع" ? "مدفوع" : "الدفع"}
      </button>
    </div>
  );
}

export default InstallmentTable;
