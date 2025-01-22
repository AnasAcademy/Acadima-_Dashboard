import React from "react";
import "../../../Styles/SingleProgramPage/Footer/AnasAcademyFooter.css";
import "../../../Styles/SingleProgramPage/Footer/CreditsSections.css";

// import googlePlay from "../../../Images/Single Program Page/Footer/googlePlay.png";
// import appGallery from "../../../Images/Single Program Page/Footer/appGallery.png";
// import star from "../../../Images/Single Program Page/Footer/star.png";
// import phone from "../../../Images/Single Program Page/Footer/phone.png";

import x from "../../../Images/Single Program Page/Footer/x.png";
// import fb from "../../../Images/Single Program Page/Footer/fb.png";
import ln from "../../../Images/Single Program Page/Footer/ln.png";
import ig from "../../../Images/Single Program Page/Footer/ig.png";
// import yt from "../../../Images/Single Program Page/Footer/yt.png";

function AnasAcademyFooter() {
  return (
    <div className="anas-acad-footer">
      <div className="anas-acad-socials">
        <ul className="anas-logos-main-container">
          <a
            className="anasacad-logo-container"
            href="https://www.instagram.com/anasacademy/"
          >
            <img src={ig} alt="ig" className="logo" />
          </a>
          <a
            className="anasacad-logo-container"
            href="https://www.linkedin.com/company/anascogruop/about/"
          >
            <img src={ln} alt="ln" className="logo" />
          </a>
          <a
            className="anasacad-logo-container"
            href="https://x.com/ANASCOGROUP"
          >
            <img src={x} alt="x" className="logo" />
          </a>
        </ul>
        <p className="anas-acad-socials-left">
          Acadima College and its accreditation is part of Anasco International
          Education Group. All rights reserved.
        </p>
      </div>
    </div>
  );
}

export default AnasAcademyFooter;
