import React, { useState } from "react";
import "../../Styles/Course/Course.css";

import pdfIcon from '../../Images/pdf.svg';

const VideoContent = ({ videoSrc }) => {
  const [hasVideo] = useState(!!videoSrc); // Check if video source exists

  return (
    <div className="video-content-container">
      {/* Video Section */}
      <div className="video-container">
        <h2 className="video-title">عنوان المقطع / المحتوى</h2>
        <div className={`video-section ${hasVideo ? "" : "placeholder"}`}>
          {hasVideo ? (
            <video controls className="video-player">
              <source src={videoSrc} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          ) : (
            <div className="video-placeholder">
              <span className="placeholder-text">لا يوجد فيديو للعرض</span>
            </div>
          )}
        </div>
      </div>

      {/* Additional Content */}
      <div className="additional-content">
        <h3>محتوى إضافي / مرفقات</h3>
        <div className="content-section">
          <h4>عنوان الفقرة:</h4>
          <p>
          هنا نص عشوائي يُستخدم لملء الفراغات في التصميم. هذا النص لا يحمل معنى محدد بل يُستخدم لأغراض العرض فقط. يمكنك استخدامه لتجربة توزيع النصوص وتنسيقها في التصميم. النص يتكرر هنا بدون محتوى فعلي لإظهار الشكل النهائي للصفحة.
          </p>
        </div>
        <div className="attachments">
          <h4>مرفقات / روابط تحميل : </h4>
          <div className="pdf-item">
          <img src={pdfIcon} alt="pdfIcon" className="pdf-icon" />
          <p>اسم الملف / المرفق</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoContent;
