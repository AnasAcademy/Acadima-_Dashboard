import React from "react";
import "../../Styles/Installments/Installments.css";

function ProgressChart({
  selectedProgram,
  paidInstallments,
  totalInstallments,
}) {
  const progress = (paidInstallments / totalInstallments) * 100;

  return (
    <div className="progress-chart-container">
      <div className="progress-chart">
        <svg className="progress-ring" width="228" height="228">
          {/* Background circle with white stroke */}
          <circle
            className="progress-ring__background"
            stroke="#FFFFFF" // White stroke for the remaining part
            strokeWidth="20" // Adjust stroke width proportionally
            fill="transparent"
            r="100" // Updated radius (half of the SVG minus strokeWidth/2)
            cx="114" // Center X (half of width)
            cy="114" // Center Y (half of height)
          />

          {/* Progress circle */}
          <circle
            className="progress-ring__circle"
            stroke="#599FAF" // Progress stroke color
            strokeWidth="20" // Adjust stroke width proportionally
            fill="transparent"
            r="100" // Same radius as background circle
            cx="114" // Center X (half of width)
            cy="114" // Center Y (half of height)
            style={{
              strokeDasharray: 2 * Math.PI * 100, // Circumference: 2 * PI * r
              strokeDashoffset:
                2 * Math.PI * 100 - (2 * Math.PI * 100 * progress) / 100, // Calculate progress
            }}
          />
        </svg>

        <div className="progress-text-div">
          <span className="progress-text">المبلغ الكلي</span>
          <p className="progress-total-price">{`${selectedProgram?.total_installments_amount}`}</p>
          <span className="progress-text">
          {paidInstallments === 0 
          ? `لم يتم سداد أى أقساط`
          : paidInstallments === 1 
          ? `تم سداد ${paidInstallments} قسط`
          : `تم سداد ${paidInstallments} أوقسات`}
          </span>
        </div>
      </div>
    </div>
  );
}

export default ProgressChart;
