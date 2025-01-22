import React from "react";
import "../../Styles/SingleProgramPage/Description.css";

import redarrow from "../../Images/Single Program Page/arr_bottom_litered.svg.svg";
import greenarrow from "../../Images/Single Program Page/arr_top_litegreen.svg.svg";

function Description({ title, desc }) {
  return (
    <div className="description">
      <div className="backgroundImg"></div>

      <div className="desc-container">
        <div className="desc-content">
          <h2 className="desc-title">{title}</h2>
          <p className="desc-desc">{desc}</p>
        </div>

        <div className="desc-bottom">
          <div className="desc-bottom-content">
            <p className="desc-percentage green">
              {" "}
              <img src={greenarrow} alt="greenarrow" className="desc-arrow" />
              93%
            </p>
            <p className="desc-bottom-p">Of business report an IT gap.<br/>(Forbes)</p>
          </div>
          <div className="desc-bottom-content">
            <p className="desc-percentage green">
              <img src={greenarrow} alt="greenarrow" className="desc-arrow" />
              70%
            </p>
            <p className="desc-bottom-p">Of all workers will need reskilling by 2024 (Reuters)</p>
          </div>
          <div className="desc-bottom-content">
            <p className="desc-percentage red">
              <img src={redarrow} alt="redarrow" className="desc-arrow" />
              65%
            </p>
            <p className="desc-bottom-p">Of businesses are in short supply of seasoned tech skills</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Description;
