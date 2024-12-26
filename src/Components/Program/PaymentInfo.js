import React from "react";

function PaymentInfo({ earlyRegistrationFee, installmentFee, installments }) {
  return (
    <div className="payment-options">
      <div className="payment-option">
        <h5 className="option-title">رسوم التسجيل المبكر</h5>
        <p className="price">{earlyRegistrationFee}</p>
        <button className="payment-button">لدفع الرسوم كاملة اضغط هنا</button>
      </div>
      <div className="payment-option">
        <h5 className="option-title">تقسيط</h5>
        <p className="price">{installmentFee}</p>
        <button className="payment-button">لدفع الرسوم بالتقسيط اضغط هنا</button>
        <ul className="installments-list">
          {installments.map((installment, index) => (
            <li key={index}>{installment}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default PaymentInfo;
