import React from "react";
import "../../Styles/Certificates/Certificates.css";

import certificateimg from '../../Images/certificateimg.svg';
import linkedinicon from '../../Images/linkedin.svg';


function CertificateCard({
  title,
  programName,
  certificateId,
  onLinkedIn,
  onDownloadPDF,
  onDownloadJPEG,
}) {
  return (
    <div className="certificate-card">
      <div className="certificate-right">
        <div className="certificateimg-container"><img src={certificateimg} alt="certificateimg" className="certificateimg"/></div>
        <div className="certificate-info">
          <p className="certificate-congrats">تهانينا، لقد أكملت البرنامج بنجاح</p>
          <h4 className="certificate-program">{programName}</h4>
          <p className="certificate-id">معرف الشهادة: {certificateId}</p>
        </div>
      </div>
      <div className="certificate-actions">
        <button className="linkedinicon-container" onClick={onLinkedIn}>
          <img src={linkedinicon} alt="linkedinicon" className="linkedinicon"/>
        </button>
        <button className="download-button" onClick={onDownloadJPEG}>
          JPEG تحميل الشهادة
        </button>
        <button className="download-button" onClick={onDownloadPDF}>
          pdf تحميل الشهادة
        </button>
      </div>
    </div>
  );
}

export default CertificateCard;
