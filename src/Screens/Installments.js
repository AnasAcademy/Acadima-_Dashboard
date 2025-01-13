import React, { useState, useContext } from "react";
import { UserContext } from "../Context/UserContext";
import "../Styles/Installments/Installments.css";

import MobileInstallmentTable from '../Components/Installments/MobileInstallmentTable';
import InstallmentTable from "../Components/Installments/InstallmentTable";
import ProgramInstallmentCard from "../Components/Installments/ProgramInstallmentCard";
import InstallmentCard from "../Components/Installments/InstallmentCard";

function Installments() {
    const { ProgramsInstallmentData } = useContext(UserContext);
  
  const [selectedProgram, setSelectedProgram] = useState(null);

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
            <div className="wide-screen-view">
              <div className="installment-table">
                <div className="installment-table-header">
                  <p className="installment-table-item">الرقم</p>
                  <p className="installment-table-item">تفاصيل القسط</p>
                  <p className="installment-table-item">المبلغ</p>
                  <p className="installment-table-item">نهاية القسط</p>
                  <p className="installment-table-item">تاريخ الدفع</p>
                  <p className="installment-table-item">حالة الدفع</p>
                </div>
                <InstallmentTable id={1} step={selectedProgram?.upfront} />
                {selectedProgram?.installments_steps.map((step, index) => (
                  <InstallmentTable
                    id={index + 2} // Correctly embedded expression
                    step={step}
                    order_id={selectedProgram?.id}
                  />
                ))}
              </div>
            </div>
            <div className="mobile-screen-view"> 
            <MobileInstallmentTable step={selectedProgram?.upfront} />
                {selectedProgram?.installments_steps.map((step, index) => (
                  <MobileInstallmentTable
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
