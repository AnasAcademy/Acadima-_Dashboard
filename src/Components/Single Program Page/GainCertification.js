import React from 'react';
import '../../Styles/SingleProgramPage/GainCertification.css';
import certificateImage from '../../Images/Single Program Page/certificateImg.png';

function GainCertification({certificateDesc, sectionId}) {
  return (
    <div className='cert-section'>
      <h2 id={sectionId} className="single-program-section-title">Certification</h2>
      <h2 className='cert-title'>Gain Certification and Advance Your Career</h2>
      <div className='cert-content'>
        <div className="certification-text">
            <p>{certificateDesc}</p>
        </div>
        <div className="certification-image">
            <img src={certificateImage} alt="certificateImage" className='certificateImage'/>
        </div>
      </div>
    </div>
  );
}

export default GainCertification;
