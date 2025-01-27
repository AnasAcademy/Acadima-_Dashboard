import React from "react";
import "../../Styles/SingleProgramPage/WhyEnroll.css";

function WhyEnroll({programId}) {
  const benefits = programId === "66" ? [
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
  ] : [
    {
      number: "01.",
      title: "Industry-Recognised Certification",
      description:
        "Enhance your CV with a globally recognised credential.",
    },
    {
      number: "02.",
      title: "Hands-On Learning",
      description:
        "Practical exercises to build your confidence using Microsoft 365 tools.  ",
    },
    {
      number: "03.",
      title: "Expert-Led Instruction",
      description:
        " Learn from certified Microsoft trainers with real-world experience.  ",
    },
    {
      number: "04.",
      title: "Career Advancement",
      description:
        "Open doors to IT and cloud-based roles in organisations worldwide. ",
    },
  ];

  return (
    <div className="why-enrol-section">
      <div className="why-enrol-top">
        <div className="backgroundImg"></div>
        <h2 className="why-enrol-title">
          Why Enrol in the {programId === "66" ? "Cybersecurity Practitioner" : "Microsoft Foundation"} Program?
        </h2>
      </div>
      <div   className={`why-enrol-grid ${programId === "66" ? "grid-66" : programId === "67" ? "grid-67" : ""}`}>
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
