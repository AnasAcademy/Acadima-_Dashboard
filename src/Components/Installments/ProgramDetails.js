import React from "react";
import "../../Styles/Installments/Installments.css";

import payment from "../../Images/Sidebar icons/payment.svg";

function ProgramDetails({selectedProgram}) {

  return (
    <div className="payment-program-details">
      <div className="program-details-half">
        <h2 className="program-details-title">{selectedProgram?.orderItem?.title}</h2>
        <p className="program-details-date">
          تاريخ التسجيل:{" "}
          <span className="registrationDate">{selectedProgram?.registerd_date}</span>
        </p>
        <p className="program-details-date">
          حالة الدفع: <span className="payment-status">{selectedProgram?.orderIsCompleted ? "تم تسديد الأقساط" :  "جارى تسديد الأقساط" }</span>
        </p>
      </div>
      <div className="program-details-half-two">
        <div className="program-details-title-div">
          <img src={payment} alt="payment" className="paymentimg" />
          <h2 className="program-details-title">تفاصيل أقساط البرنامج</h2>
        </div>
        <div className="program-details-payment-info-div">
          <p className="program-details-payment-info" style={{color: "#CCF5FF"}}>
            رسوم البرنامج: {selectedProgram?.total_installments_amount} ريال سعودي
          </p>
          <p className="program-details-payment-info">
            إجمالي عدد الأقساط: {selectedProgram?.total_installments_count} أقساط
          </p>
          <p className="program-details-payment-info">
            الأقساط المتبقية: {selectedProgram?.remained_installments_count} قسط
          </p>
        </div>
      </div>
    </div>
  );
}

export default ProgramDetails;
