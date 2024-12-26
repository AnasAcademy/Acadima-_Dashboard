import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { apiUrl } from "../API";

import "../Styles/Installments/InstallmentsConditions.css";

import condlogo from "../Images/AcadimaLogo.png";
import conditionsbg from "../Images/conditions.png";
import payment from "../Images/Sidebar icons/payment.svg";
import installmentdeadline from "../Images/installmentdeadline.svg";

function InstallmentConditions() {
  const location = useLocation();
  const navigate = useNavigate();
  const { program  } = location.state || {}; // Get passed data

  const token = localStorage.getItem("token");


  const handleInstallmentPayment = async () => {
    try {
      const response = await fetch(apiUrl + "/panel/programs/purchase/" + program?.installment_plan?.id, {
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
    <div className="conditions-page-container">
      {/* Header */}
      <div className="conditions-page-header">
        <img src={condlogo} alt="condlogo" className="condlogo" />
      </div>

      {/* Hero Section */}
      <div className="conditions-hero-section">
        <img src={conditionsbg} alt="conditionsbg" className="conditionsbg" />
        <h1 className="conditions-hero-title">مراجعة وتأكيد الأقساط</h1>
      </div>

      {/* Selected Installment Brief */}
      <div className="installment-brief">
        <h3 className="brief-title">نظرة عامة على القسط</h3>
        <p className="brief-program-name"> اسم البرنامج : {program?.title}</p>
        <div className="brief-details">
          <div className="brief-details-part">
            <img src={payment} alt="payment" className="payment-icon" />
            <span className="brief-program-name">{program?.installment_plan?.upfront}</span>
          </div>
          <div className="brief-details-part">
            <img
              src={installmentdeadline}
              alt="installmentdeadline"
              className="payment-icon"
            />
            <span className="brief-program-name">تاريخ انتهاء الأقساط {program?.installment_plan?.last_step_date}</span>
          </div>
        </div>
      </div>

      {/* Installment Conditions */}
      <div className="installment-brief">
        <h3 className="brief-title">شروط وأحكام القسط</h3>
        <span className="brief-program-name">
          عند دفع أول قسط لبرنامج الأكاديمية، فإنك توافق على جميع الشروط
          والأحكام التالية:
        </span>
        <ul className="conditions-list">
          <li className="condition">
            <span>1. قبول الشروط : </span>
            <span>
              بمجرد إتمام عملية الدفع لأي من الأقساط، يُعتبر أن المستخدم قد وافق
              على جميع الشروط والأحكام المذكورة.
            </span>
          </li>
          <li className="condition">
            <span>2. جدول الدفعات : </span>
            <span>
              يتعين الالتزام بدفع جميع الأقساط المتفق عليها في الوقت المحدد وفق
              جدول الأقساط.
            </span>
          </li>
          <li className="condition">
            <span>3. تأخير الدفع : </span>
            <span>
              في حال تأخر الدفعات، يحق لـ acadima اتخاذ الإجراءات المناسبة لضمان
              استكمال الأقساط، بما في ذلك تجميد البرنامج أو وقف الوصول إلى
              المواد التعليمية.
            </span>
          </li>
          <li className="condition">
            <span>4. استيراد المبلغ : </span>
            <span>
              لا يمكن استرداد أي دفعة تمت، باستثناء الظروف الخاصة التي يتم
              تقييمها من قبل إدارة acadima.
            </span>
          </li>
          <li className="condition">
            <span>5. الوصول للبرنامج : </span>
            <span>
              يتم منح الوصول إلى البرنامج التعليمي عند إتمام الدفعة الأولى
              بنجاح.
            </span>
          </li>
          <li className="condition">
            <span>6. إشعار تذكيرى : </span>
            <span>
              سيتم إرسال إشعارات قبل تاريخ استحقاق كل دفعة لتجنب أي تأخير أو
              إيقاف للخدمات.
            </span>
          </li>
          <li className="condition">
            <span>7. التواصل و الدعم : </span>
            <span>
              يمكن للمشتركين التواصل مع فريق الدعم في acadima للاستفسارات حول
              الدفعات أو الشروط.
            </span>
          </li>
        </ul>

        <div className="brief-subcontainer">
          <h3 className="brief-title subcontainer">هام جدا</h3>
          <span>من خلال المتابعة في عملية الدفع، فإنك توافق على جميع الشروط والأحكام وتتعهد بالالتزام بها لضمان استمرارية وصولك إلى خدمات acadima.</span>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="button-group">
        <button className="back-button" onClick={() => navigate(-1)}>
          الرجوع
        </button>
        <button className="confirm-button" onClick={handleInstallmentPayment}>موافق</button>
      </div>
    </div>
  );
}

export default InstallmentConditions;
