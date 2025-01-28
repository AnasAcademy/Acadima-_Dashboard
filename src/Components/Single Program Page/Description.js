import React from "react";
import "../../Styles/SingleProgramPage/Description.css";

import redarrow from "../../Images/Single Program Page/arr_bottom_litered.svg.svg";
import greenarrow from "../../Images/Single Program Page/arr_top_litegreen.svg.svg";

function Description({programId}) {
  return (
    <div className="description">
      <div className="backgroundImg"></div>

      <div className="desc-container">
        <div className="desc-content">
          <h2 className="desc-title">Why learn {programId === 66 ? "Cybersecurity Practitioner?" : "Microsoft 365 Certified: Fundamentals?" }</h2>
          <p className="desc-desc">{programId === 66 ? "The future of work is changing due to AI and Data. Secure your career with in-demand skills." : "The future of work is changing equip yourself with essential knowledge of Microsoft 365 services, benefits, and cloud computing principles."}</p>
        </div>

        <div className="desc-bottom">
          <div className="desc-bottom-content">
            <p className="desc-percentage green">
              {" "}
              <img src={greenarrow} alt="greenarrow" className="desc-arrow" />
              {programId === 66 ? "46%" : "64%"}
            </p>
            <p className="desc-bottom-p">Of UK business struggle to recruit due to lack of digital skills training</p>
          </div>
          <div className="desc-bottom-content">
            <p className="desc-percentage green">
              <img src={greenarrow} alt="greenarrow" className="desc-arrow" />
              {programId === 66 ? "£55k" : "£30k "}
            </p>
            <p className="desc-bottom-p">Average Cybersecurity Analyst salary in the UK </p>
          </div>
          <div className="desc-bottom-content">
            <p className="desc-percentage green">
              <img src={greenarrow} alt="greenarrow" className="desc-arrow" />
              {programId === 66 ? "8%" : "4% "}
            </p>
            <p className="desc-bottom-p">{programId === 66 ? "This is an 8.33% salary increase from the same period in 2024." : "This is an 4.23% salary increase from the same period in 2024. "}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Description;
