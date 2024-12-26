import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiUrl } from "../../API";

import "../../Styles/Program/Program.css";

function ProgramCard({ program }) {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  function handleInstallmentClick() {
    navigate("/conditions", {
      state: {
        program: program,
      },
    });
  }

  const [showInstallments, setShowInstallments] = useState(false);
  let type = "";

  if (program?.bought_type === "cache") {
    type = "رسوم التسجيل المبكر";
  } else {
    type = "تقسيط";
  }

  const toggleInstallments = () => {
    setShowInstallments((prev) => !prev);
  };

  const handleCashClick = async (programId) => {
    try {
      const response = await fetch(apiUrl + "/panel/programs/purchase", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": "1234",
          "ngrok-skip-browser-warning": true,
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify({ item_id: programId }),
      });
      console.log(programId);

      const result = await response.json();

      console.log(result);
      if (result.success === true) {
        let order_id = result?.data?.order?.id;
        navigate("/payment/" + order_id);
        // alert(result.message);
      } else {
        console.log(result.errors);
      }
    } catch (error) {}
  };

  return (
    <div className="my-program-card">
      <h4 className="my-program-title">{program?.title}</h4>

      {program?.has_bought ? ( // Display these elements only when not expanded
        <div className="program-card-second-container">
          <h3 className="span-one">{type}</h3>
          <span className="span-two">السعر شامل الضريبة</span>
          <div className="buy-button">تم الشراء</div>
        </div>
      ) : (
        <>
          <div className="program-details">
            <div className="payment-option">
              <div className="payment-option-top">
                <h3 className="span-one">رسوم التسجيل المبكر</h3>
                <span className="span-two">السعر شامل الضريبة</span>
              </div>
              <div className="price-cont">
                <p className="price">{program?.price} ر.س</p>
                <button
                  className="payment-button"
                  onClick={(event) => handleCashClick(program?.id)}
                >
                  لدفع الرسوم كاملة اضغط هنا
                </button>
              </div>

              <span className="span-two">البرنامج عن بعد 100%</span>
            </div>
            {program?.installment_plan ? (
              <div className="payment-option">
                <div className="payment-option-top">
                  <h3 className="span-one">تقسيط</h3>
                </div>
                <div className="price-cont">
                  <p className="price">
                    {program?.installment_plan?.totalPayments} ر.س
                  </p>
                  <button
                    className="payment-button"
                    onClick={() => handleInstallmentClick()}
                  >
                    لدفع الرسوم بالتقسيط اضغط هنا
                  </button>
                </div>
                <button
                  className="installments-toggle-button"
                  onClick={toggleInstallments}
                >
                  {showInstallments ? "إخفاء الأقساط" : "عرض الأقساط"}
                </button>
                {showInstallments && (
                  <ul className="installments-list">
                    <p className="upfront-p">
                      {program?.installment_plan?.upfront}
                    </p>
                    {program?.installment_plan?.steps.map((step, index) => (
                      <li key={index}>{step}</li>
                    ))}
                  </ul>
                )}
              </div>
            ) : (
              <></>
            )}
          </div>
          {/* <div className="save-seat-cont">
            <span>أو</span>
            <button className="save-seat-button">احجز مقعد</button>
          </div> */}
        </>
      )}
    </div>
  );
}

export default ProgramCard;
