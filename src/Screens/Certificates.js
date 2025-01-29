import React, { useState, useContext } from "react";
import { apiUrl } from "../API";
import { UserContext } from "../Context/UserContext";
import "../Styles/Certificates/Certificates.css";

import CertificateCard from "../Components/Certificates/CertificateCard";

function Certificates() {
  const token = localStorage.getItem("token");
  const { certificates} = useContext(UserContext);
  const [certpfd, setcertpdf] = useState([]);
  const [certpng, setcertpng] =useState([]);


  // const handleLinkedIn = (certificateId) => {
  //   // console.log(`Sharing certificate ${certificateId} on LinkedIn.`);
  // };

  const handleDownloadPDF = async (programId) => {
    try {
      const response = await fetch(
        `${apiUrl}/panel/program/${programId}/showCertificate/pdf`,
        {
          method: "GET",
          headers: {
            "x-api-key": "1234",
            "ngrok-skip-browser-warning": true,
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      if (response.ok) {
        const blob = await response.blob(); // Get the binary data as a blob
        const url = window.URL.createObjectURL(blob); // Create a URL for the blob
        const a = document.createElement("a");
        a.href = url;
        a.download = `certificate_${programId}.pdf`; // Specify the file name
        document.body.appendChild(a);
        a.click(); // Trigger the download
        a.remove(); // Remove the anchor element
      } else {
        console.error("Failed to download PDF:", response.status);
      }
    } catch (error) {
      console.error("Error loading certificate PDF:", error);
    }
  };
  
  const handleDownloadJPEG = async (programId) => {
    try {
      const response = await fetch(
        `${apiUrl}/panel/program/${programId}/showCertificate/png`,
        {
          method: "GET",
          headers: {
            "x-api-key": "1234",
            "ngrok-skip-browser-warning": true,
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      if (response.ok) {
        const blob = await response.blob(); // Get the binary data as a blob
        const url = window.URL.createObjectURL(blob); // Create a URL for the blob
        const a = document.createElement("a");
        a.href = url;
        a.download = `certificate_${programId}.png`; // Specify the file name
        document.body.appendChild(a);
        a.click(); // Trigger the download
        a.remove(); // Remove the anchor element
      } else {
        console.error("Failed to download JPEG:", response.status);
      }
    } catch (error) {
      console.error("Error loading certificate JPEG:", error);
    }
  };
  

  return (
    <>
      <div className="certificates-container">
        <div className="certificate-section">
          <h3 className="section-title">شهادات اتمام البرامج</h3>
          <div className="certificates-list">
            {certificates.map((certificate) => (
              <CertificateCard
                key={certificate.id}
                programName={certificate.program?.title || "Unknown Program"}
                certificateId={certificate.code}
                // onLinkedIn={() => handleLinkedIn(certificate.code)}
                onDownloadPDF={() => handleDownloadPDF(certificate.program?.id)}
                onDownloadJPEG={() => handleDownloadJPEG(certificate.program?.id)}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Certificates;
