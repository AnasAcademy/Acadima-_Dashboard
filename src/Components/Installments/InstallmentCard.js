import React from "react";

import ProgramDetails from "./ProgramDetails";
import ProgressChart from "./ProgressChart";

function InstallmentCard({ selectedProgram }) {
  return (
    <div className="payment-top">
      {/* Program Details */}
      <ProgramDetails selectedProgram={selectedProgram} />

      {/* Progress Chart */}
      <div className="progress-chart-container">
        <ProgressChart
          selectedProgram={selectedProgram}
          paidInstallments={
            selectedProgram?.total_installments_count -
            selectedProgram?.remained_installments_count
          }
          totalInstallments={selectedProgram?.total_installments_count}
        />
      </div>
    </div>
  );
}

export default InstallmentCard;
