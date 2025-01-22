import React from "react";
import "../../Styles/SingleProgramPage/WhyEnroll.css";

function WhyEnroll() {
  const benefits = [
    {
      number: "01.",
      title: "Practical Learning",
      description:
        "Gain experience with live environments, tools, and frameworks used by cybersecurity experts.",
    },
    {
      number: "02.",
      title: "Industry-Ready Skill",
      description:
        "Focus on actionable knowledge that you can immediately apply in your workplace.",
    },
    {
      number: "03.",
      title: "Advanced Tools & Techniques",
      description:
        "Work with industry-standard platforms like Wireshark, Metasploit, and Splunk.",
    },
    {
      number: "04.",
      title: "Experienced Mentors",
      description:
        "Learn from professionals with deep expertise in active threat management and prevention.",
    },
    {
      number: "05.",
      title: "Certification Preparation",
      description:
        "Get ready for leading certifications, including CEH, CompTIA Security+, and CISSP.",
    },
    {
      number: "06.",
      title: "Lifelong Learning",
      description:
        "Stay ahead with resources, webinars, and an exclusive alumni network for growth.",
    },
  ];

  return (
    <div className="why-enrol-section">
      <div className="why-enrol-top">
        <div className="backgroundImg"></div>
        <h2 className="why-enrol-title">
          Why Enrol in the Cybersecurity Practitioner Program?
        </h2>
      </div>
      <div className="why-enrol-grid">
        {benefits.map((benefit, index) => (
          <div key={index} className="benefit-card">
            <h3 className="benefit-number">{benefit.number}</h3>
            <div className="benefit-card-right">
              <h4 className="benefit-title">{benefit.title}</h4>

              <p className="benefit-description">{benefit.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default WhyEnroll;
