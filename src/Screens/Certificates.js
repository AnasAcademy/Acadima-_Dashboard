import React, { useState, useEffect } from "react";
import { apiUrl } from "../API";

import "../Styles/Certificates/Certificates.css";

import MainPageContainer from "../Components/Main/MainPageContainer";
import CertificateCard from "../Components/Certificates/CertificateCard";

function Certificates() {
  const token = localStorage.getItem("token");
  const [certificates, setCertificates] = useState([]);
  const [certpfd, setcertpdf] = useState([]);
  const [certpng, setcertpng] =useState([]);

  const fetchCertificates = async () => {
    try {
      const response = await fetch(apiUrl + "/panel/certificates/achievements", {
        method: "GET",
        headers: {
          "x-api-key": "1234",
          "ngrok-skip-browser-warning": true,
          Authorization: `Bearer ${token}`,
        },
      });

      const result = await response.json();
      setCertificates(result?.data?.bundleCertificates || []);
    } catch (error) {
      console.log("Error fetching certificates:", error);
    }
  };

  useEffect(() => {
    fetchCertificates();
  }, []);

  const handleLinkedIn = (certificateId) => {
    console.log(`Sharing certificate ${certificateId} on LinkedIn.`);
  };

  const handleDownloadPDF = async () => {
    try {
      const response = await fetch(apiUrl + "/panel/program/37/showCertificate/pdf", {
        method: "GET",
        headers: {
          "x-api-key": "1234",
          "ngrok-skip-browser-warning": true,
          Authorization: `Bearer ${token}`,
        },
      });

      const result = await response.json();
      console.log(response);
    } catch (error) {
      console.log("Error loading certificates:", error);
    }  };

  const handleDownloadJPEG = async () => {
    console.log(`Downloading JPEG for certificate`);
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
                onLinkedIn={() => handleLinkedIn(certificate.code)}
                onDownloadPDF={() => handleDownloadPDF(certificate.code)}
                onDownloadJPEG={() => handleDownloadJPEG(certificate.code)}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Certificates;
