import React, { useState, useEffect } from "react";
import "../Styles/Installments/Installments.css";
import { apiUrl } from "../API";

import MainPageContainer from "../Components/Main/MainPageContainer";
import InstallmentTable from "../Components/Installments/InstallmentTable";
import ProgramInstallmentCard from "../Components/Installments/ProgramInstallmentCard";
import InstallmentCard from "../Components/Installments/InstallmentCard";

function Installments() {
  const [selectedProgram, setSelectedProgram] = useState(null);

  // const programsData = [
  //   {
  //     id: 1,
  //     title: "الذكاء الاصطناعي Open IA للمبتدئين: التوجيه البرمجي",
  //     type: "دورة تدريبية",
  //     registrationDate: "21 سبتمبر 2024",
  //     paymentStatus: "جاري سداد الأقساط",
  //     installments: [
  //       {
  //         id: 1,
  //         order: "القسط الأول (التسجيل)",
  //         amount: 1150,
  //         deadline: "1 نوفمبر 2024",
  //         paymentDate: "1 نوفمبر 2024",
  //         status: "مدفوع",
  //       },
  //       {
  //         id: 2,
  //         order: "القسط الثاني",
  //         amount: 966,
  //         deadline: "1 ديسمبر 2024",
  //         paymentDate: "1 ديسمبر 2024",
  //         status: "مدفوع",
  //       },
  //       {
  //         id: 3,
  //         order: "القسط الثالث",
  //         amount: 966,
  //         deadline: "1 يناير 2025",
  //         paymentDate: "-",
  //         status: "مدفوع",
  //       },
  //       {
  //         id: 4,
  //         order: "القسط الرابع",
  //         amount: 966,
  //         deadline: "1 فبراير 2025",
  //         paymentDate: "-",
  //         status: "دفع رسوم القسط",
  //       },
  //     ],
  //   },
  //   {
  //     id: 2,
  //     type: "دورة تدريبية",
  //     title: "دبلوم تقني: الذكاء الاصطناعي للمبتدئين",
  //     registrationDate: "15 أكتوبر 2024",
  //     paymentStatus: "جاري سداد الأقساط",
  //     installments: [
  //       {
  //         id: 1,
  //         order: "القسط الأول",
  //         amount: 4048,
  //         deadline: "15 نوفمبر 2024",
  //         paymentDate: "15 نوفمبر 2024",
  //         status: "مدفوع",
  //       },
  //       {
  //         id: 2,
  //         order: "القسط الثاني",
  //         amount: 966,
  //         deadline: "1 ديسمبر 2024",
  //         paymentDate: "1 ديسمبر 2024",
  //         status: "مدفوع",
  //       },
  //       {
  //         id: 3,
  //         order: "القسط الثالث",
  //         amount: 966,
  //         deadline: "1 يناير 2025",
  //         paymentDate: "-",
  //         status: "دفع رسوم القسط",
  //       },
  //     ],
  //   },
  //   {
  //     id: 2,
  //     type: "برنامج",
  //     title: "دبلوم تقني: الذكاء الاصطناعي للمبتدئين",
  //     registrationDate: "15 أكتوبر 2024",
  //     paymentStatus: "مدفوع بالكامل",
  //     installments: [
  //       {
  //         id: 1,
  //         order: "القسط الأول",
  //         amount: 4048,
  //         deadline: "15 نوفمبر 2024",
  //         paymentDate: "15 نوفمبر 2024",
  //         status: "مدفوع",
  //       },
  //       {
  //         id: 2,
  //         order: "القسط الثاني",
  //         amount: 966,
  //         deadline: "1 ديسمبر 2024",
  //         paymentDate: "1 ديسمبر 2024",
  //         status: "مدفوع",
  //       },
  //     ],
  //   },
  // ];

  const [ProgramsInstallmentData, setProgramsInstallmentData] = useState([]);
  // const selectedProgram = ProgramsInstallmentData[selectedProgramIndex];
  console.log(selectedProgram);

  // const totalAmount = selectedProgram?.total_installments_amount || 0;
  // const totalInstallments = selectedProgram?.total_installments_count || 0;
  // const remainingInstallments =
  //   selectedProgram?.remained_installments_count || 0;
  // const paidInstallments = totalInstallments - remainingInstallments;

  const token = localStorage.getItem("token");

  const fetchProgramsInstallmentData = async () => {
    try {
      const response = await fetch(apiUrl + "/panel/financial/installments", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": "1234",
          "ngrok-skip-browser-warning": true,
          Authorization: "Bearer " + token,
        },
      });

      const result = await response.json();
      console.log(result);
      setProgramsInstallmentData(result?.data?.ordersList);
      console.log(result?.data?.ordersList);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProgramsInstallmentData();
  },[]);

  return (
    <>
      <div className="installments-page">
        <h2 className="all-programs-title">جميع البرامج</h2>

        {/* Program Cards */}
        <div className="programs-cards-container">
          {ProgramsInstallmentData.map((program) => (
            <ProgramInstallmentCard
              // key={program?.orderItem?.id}
              program={program}
              isSelected={selectedProgram?.id === program?.id}
              onClick={() => setSelectedProgram(program)}
            />
          ))}
        </div>

        {/* Conditional Rendering for Program Details */}
        {selectedProgram !== null && (
          <div className="program-installment-details-container">
            <h2 className="all-programs-title ">تفاصيل أقساط البرنامج</h2>

            {/* InstallmentCard Component */}
            <InstallmentCard selectedProgram={selectedProgram} />

            {/* Installments Table */}
            <h2 className="all-programs-title">جدول تقسيط رسوم البرنامج</h2>
            <div className="installment-table">
              <div className="installment-table-header">
                <p className="installment-table-item">الرقم</p>
                <p className="installment-table-item">تفاصيل القسط</p>
                <p className="installment-table-item">المبلغ</p>
                <p className="installment-table-item">نهاية القسط</p>
                <p className="installment-table-item">تاريخ الدفع</p>
                <p className="installment-table-item">حالة الدفع</p>
              </div>
              <InstallmentTable
                id={1}
                step={selectedProgram?.upfront}
              />
              {selectedProgram?.installments_steps.map((step, index) => (
                <InstallmentTable
                  id={index + 2} // Correctly embedded expression
                  step={step}
                  order_id={selectedProgram?.id}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Installments;
