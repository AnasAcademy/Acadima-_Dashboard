import React from "react";
import "../../../Styles/SingleProgramPage/Footer/CreditsSections.css";

import anascoLogo from "../../../Images/Single Program Page/Footer/anascoLogo.png";
import extraLogo1 from "../../../Images/Single Program Page/Footer/extraLogo1.png";
import extraLogo2 from "../../../Images/Single Program Page/Footer/extraLogo2.png";
import extraLogo3 from "../../../Images/Single Program Page/Footer/extraLogo3.png";

function CreditsSection() {
  return (
    <div className="credits-section">
      <a href="https://acadima.tech">
        <img src={anascoLogo} alt="anascoLogo" className="anascoLogo" />
      </a>
      <div className="credits-text-container">
        <span className="credits-text">
          All rights reserved for{" "}
          <a className="anascogroupLink" href="https://anascogroup.com/">
            anasco group for education
          </a>{" "}
          @ 2025{" "}
        </span>

        <div className="credits-left">
          <img src={extraLogo2} alt="extraLogo2" className="anascoExtraLogo" />
          <img src={extraLogo1} alt="extraLogo1" className="anascoExtraLogo" />
          <img src={extraLogo3} alt="extraLogo3" className="anascoExtraLogo" />
        </div>
      </div>
    </div>
  );
}

export default CreditsSection;
