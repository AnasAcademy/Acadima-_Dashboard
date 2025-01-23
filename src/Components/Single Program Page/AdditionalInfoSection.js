import React, { useState } from "react";
import "../../Styles/SingleProgramPage/AdditionalInfoSection.css";

import rightArrow from "../../Images/Single Program Page/rightArrow.png";
import chatIcon from "../../Images/Single Program Page/chat.svg";
import questionmark from "../../Images/Single Program Page/questionmark.svg";

function AdditionalInfoSection({ sectionId }) {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqItems = [
    {
      title: "Basic Study Information",
      content:
        "Lorem ipsum dolor sit amet consectetur. Augue blandit suspendisse sed pellentesque eget non lectus risus eu. Et tortor in nam euismod scelerisque cras enim accumsan. Mauris non malesuada sem sit eget pharetra. Blandit gravida nulla fermentum aliquet velit mollis iaculis. Enim faucibus vel feugiat eget volutpat arcu odio. Condimentum morbi porta pretium urna enim ultrices viverra.Tellus sit enim sodales pellentesque sed nibh vitae urna rhoncus. Pulvinar porta proin vel curabitur lacus. Sed sollicitudin mauris nisl justo nunc erat nam. Nunc id lorem ultrices et sit lorem tempor a convallis. Vulputate orci non vulputate gravida. Praesent eu quis orci faucibus molestie. Quam.",
    },
    {
      title: "Program Degree Requirements",
      content:
      "Lorem ipsum dolor sit amet consectetur. Augue blandit suspendisse sed pellentesque eget non lectus risus eu. Et tortor in nam euismod scelerisque cras enim accumsan. Mauris non malesuada sem sit eget pharetra. Blandit gravida nulla fermentum aliquet velit mollis iaculis. Enim faucibus vel feugiat eget volutpat arcu odio. Condimentum morbi porta pretium urna enim ultrices viverra.Tellus sit enim sodales pellentesque sed nibh vitae urna rhoncus. Pulvinar porta proin vel curabitur lacus. Sed sollicitudin mauris nisl justo nunc erat nam. Nunc id lorem ultrices et sit lorem tempor a convallis. Vulputate orci non vulputate gravida. Praesent eu quis orci faucibus molestie. Quam.",
    },
    {
      title: "How can I obtain financial Aid?",
      content:
      "Lorem ipsum dolor sit amet consectetur. Augue blandit suspendisse sed pellentesque eget non lectus risus eu. Et tortor in nam euismod scelerisque cras enim accumsan. Mauris non malesuada sem sit eget pharetra. Blandit gravida nulla fermentum aliquet velit mollis iaculis. Enim faucibus vel feugiat eget volutpat arcu odio. Condimentum morbi porta pretium urna enim ultrices viverra.Tellus sit enim sodales pellentesque sed nibh vitae urna rhoncus. Pulvinar porta proin vel curabitur lacus. Sed sollicitudin mauris nisl justo nunc erat nam. Nunc id lorem ultrices et sit lorem tempor a convallis. Vulputate orci non vulputate gravida. Praesent eu quis orci faucibus molestie. Quam.",
    },
  ];

  const handleToggle = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="additional-info-section">
      <div className="additional-info-top">
        <h2 id={sectionId} className="single-program-section-title">
          FAQ
        </h2>
        <h2 className="add-info-title">Check out frequently asked questions</h2>
        <p className="add-info-p">
          From software engineering to AI, data analytics to business analysis.
          Gain the knowledge and skills of the future – and the confidence to
          transform your career.
        </p>
      </div>
      <div className="additional-info-container">
        {/* Left FAQ Accordion Section */}
        <div className="add-info-left">
          {faqItems.map((item, index) => (
            <div key={index} className="info-left-items" onClick={() => handleToggle(index)}>
              <div
                className="info-header"
                
              >
                <img
                  src={rightArrow}
                  alt="rightArrow"
                  className={`rightArrowInfo ${
                    activeIndex === index ? "rotate" : ""
                  }`} // Rotate the arrow when active
                />
                <p className="left-items-p">{item.title}</p>
              </div>
              {activeIndex === index && (
                <div className="info-content">
                  <p>{item.content}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Right Section */}
        <div className="add-info-right">
          <img src={questionmark} alt="questionmark" className="questionmark" />
          <h3 className="more-ques">More questions?</h3>
          <p className="more-ques-p">Don't hesitate to contact us.</p>
          <div className="need-help-button">
            <img src={chatIcon} alt="chatIcon" className="chatIcon" />
            <div className="button-text">I Need Help</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdditionalInfoSection;
