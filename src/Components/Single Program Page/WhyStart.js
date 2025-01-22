import React from "react";
import '../../Styles/SingleProgramPage/WhyStart.css';

import aboutimg from '../../Images/Single Program Page/Aboutimg.png';


function WhyStart({title, desc}) {
  return (
    <div className="why-start-section">
      <img src={aboutimg} alt="aboutimg" className="why-start-img" />
      <div className="why-start-right">
        <h2 className="why-start-title">
          Why I Should Start {title} Career ?{" "}
        </h2>
        <p className="why-start-desc">{desc}<br/><span>Joining this field means contributing to a safer digital future for businesses, individuals, and society as a whole.</span></p>
      </div>
    </div>
  );
}

export default WhyStart;
