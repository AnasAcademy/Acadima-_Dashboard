import React, { useState, useContext, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom"; // Import useNavigate and useParams
import { UserContext } from "../Context/UserContext";

import "../Styles/SingleProgramPage/SingleProgramPage.css";

import ProgramHeader from "../Components/Single Program Page/ProgramHeader";
// import EmptySection from '../components/Single Program Page/EmptySection';
import GainCertification from "../Components/Single Program Page/GainCertification";
import AdditionalInfoSection from "../Components/Single Program Page/AdditionalInfoSection";
import Footer from "../Components/Single Program Page/Footer/Footer";
import PaymentSection from "../Components/Single Program Page/PaymentSection";
import WhyStart from "../Components/Single Program Page/WhyStart";
import Description from "../Components/Single Program Page/Description";
import TestimonialCard from "../Components/Single Program Page/TestimonialCard";

import mendix from "../Images/Single Program Page/companies/mendix.svg";
import google from "../Images/Single Program Page/companies/google.svg";
import hub from "../Images/Single Program Page/companies/hub.svg";
import deliveryHero from "../Images/Single Program Page/companies/deliveryhero.svg";
import adyen from "../Images/Single Program Page/companies/adyen.svg";
// import HowToApplyCard from "../Components/Single Program Page/HowToApplyCard";
import WhyEnroll from "../Components/Single Program Page/WhyEnroll";
import handson from "../Images/Single Program Page/handson.png";
import righthVector from "../Images/Single Program Page/rightVector.svg";
import leftVector from "../Images/Single Program Page/leftVector.svg";

function SingleProgramPage() {
  const { fetchSinglePageProgramData, singlePageProgramData } =
    useContext(UserContext);

    useEffect(() => {
      fetchSinglePageProgramData(); // Call the fetch function directly
    }, []);

  const sections = [
    {
      id: "overview",
      title: "Overview",
      content: (
        <div>
          <p>
            The Cybersecurity Practitioner Program is a hands-on, immersive
            course designed for professionals seeking to enhance their practical
            skills in defending digital systems. Tailored for those already
            working in or transitioning to cybersecurity roles, this program
            equips participants with real-world tools and methodologies to
            tackle modern cyber threats effectively.
          </p>
          <p>
            Whether you’re a system administrator, IT specialist, or aspiring
            security professional, this program bridges the gap between theory
            and practice, preparing you to thrive in high-stakes environments.
          </p>
        </div>
      ),
    },
    {
      id: "highlights",
      title: "Program Highlights",
      content: (
        <div>
          <h4>Core Focus Areas</h4>
          <ul>
            <li>Threat Detection and Mitigation</li>
            <li>Ethical Hacking and Penetration Testing</li>
            <li>Incident Response and Recovery</li>
            <li>Vulnerability Assessments</li>
            <li>Secure Network Architecture</li>
          </ul>
        </div>
      ),
    },
    {
      id: "who-should-join",
      title: "Who Should Join?",
      content: (
        <div>
          <h4>This program is ideal for:</h4>
          <ul>
            <li>
              People looking for a way in cybersecurity with basic computer
              skills.
            </li>
            <li>IT professionals transitioning into cybersecurity.</li>
            <li>
              Technology professionals aiming to specialize in threat
              prevention.
            </li>
          </ul>
        </div>
      ),
    },
    {
      id: "outcomes",
      title: "Key Learning Outcomes",
      content: (
        <div className="content-container">
          <h4>
            Graduates of the Cybersecurity Practitioner Program will be able to:
          </h4>
          <ul>
            <li>
              Perform advanced threat detection and vulnerability assessments.
            </li>
            <li>Build and manage secure networks and applications.</li>
            <li>
              Execute ethical hacking practices and identify system weaknesses.
            </li>
            <li>
              Lead incident response efforts to minimize damage and recover
              operations.
            </li>
            <li>
              Implement cutting-edge security measures to prevent future
              attacks.
            </li>
          </ul>
        </div>
      ),
    },
    {
      id: "careers",
      title: "Careers",
      content: (
        <div className="content-container">
          <h4>Graduates from this program often secure roles such as:</h4>
          <ul>
            <li>Cybersecurity Analyst</li>
            <li>Penetration Tester</li>
            <li>Security Engineer</li>
            <li>Incident Response Specialist</li>
          </ul>
        </div>
      ),
    },
  ];

  const [activeSection, setActiveSection] = useState("overview");

  const handleSectionClick = (sectionId) => {
    setActiveSection(sectionId);
  };

  const activeContent = sections.find(
    (section) => section.id === activeSection
  );

  const steps = [
    {
      step: 1,
      title: "Application",
      description: "Officially apply to the program",
      buttonText: "Apply today",
      highlight: true,
    },
    {
      step: 2,
      title: "Lorem ipsum dolor sit",
      description:
        "Lorem ipsum dolor sit amet consectetur. Nam vel netus faucibus pretium cras fringilla.",
      buttonText: "Start now →",
      highlight: false,
    },
    {
      step: 3,
      title: "Lorem ipsum dolor sit",
      description:
        "Lorem ipsum dolor sit amet consectetur. Nam vel netus faucibus pretium cras fringilla.",
      buttonText: "Start now →",
      highlight: false,
    },
    {
      step: 4,
      title: "Lorem ipsum dolor sit",
      description:
        "Lorem ipsum dolor sit amet consectetur. Nam vel netus faucibus pretium cras fringilla.",
      buttonText: "Start now →",
      highlight: false,
    },
  ];

  const testimonials = [
    {
      title: "Lorem ipsum dolor sit amet",
      content:
        "Lorem ipsum dolor sit amet consectetur. Non rhoncus velit vitae feugiat augue. Condimentum id in arcu proin mattis semper mi amet. Non parturient lobortis cras ultricies neque. Accumsan tempor convallis mollis molestie euismod molestie morbi aliquam. Ac nunc tristique placerat diam netus fermentum.Tellus lacus lobortis facilisi sed. Nibh felis eleifend egestas arcu sodales. Ac enim at velit etiam volutpat ultrices. ",
      author: "JPaul",
      author_desc: "Code Institute Graduate 2021",
    },
    {
      title: "Lorem ipsum dolor sit",
      content:
        "Lorem ipsum dolor sit amet consectetur. Non rhoncus velit vitae feugiat augue. Condimentum id in arcu proin mattis semper mi amet. Non parturient lobortis cras ultricies neque. Accumsan tempor convallis mollis molestie euismod molestie morbi aliquam. Ac nunc tristique placerat diam netus fermentum.Tellus lacus lobortis facilisi sed. Nibh felis eleifend egestas arcu sodales. Ac enim at velit etiam volutpat ultrices. ",
      author: "JPaulllll",
      author_desc: "Code Institute Graduate 2023",
    },
    {
      title: "Lorem ipsum dolor",
      content:
        "Lorem ipsum dolor sit amet consectetur. Non rhoncus velit vitae feugiat augue. Condimentum id in arcu proin mattis semper mi amet. Non parturient lobortis cras ultricies neque. Accumsan tempor convallis mollis molestie euismod molestie morbi aliquam. Ac nunc tristique placerat diam netus fermentum.Tellus lacus lobortis facilisi sed. Nibh felis eleifend egestas arcu sodales. Ac enim at velit etiam volutpat ultrices. ",
      author: "JPaulyy",
      author_desc: "Code Institute Graduate 2022",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
  };

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="programDetailsScreen">
      <ProgramHeader
        program={singlePageProgramData}
        appDeadline="Oct 2"
        durationInSemesters="3"
        durationInHours="230"
        durationDetails="6 months, 10 hours a week"
        level="Beginner"
        levelDetails="No need for previous experience"
        courseLanguage="Arabic/English"
      />

      <div className="single-program-id-bar">
        <div className="single-program-id-bar-items">
          <p onClick={() => scrollToSection("program-details")}>
            Program Details
          </p>
          <p onClick={() => scrollToSection("Hands-on-Labs")}>Hands-on Labs</p>
          <p onClick={() => scrollToSection("certification")}>Certification</p>
          <p onClick={() => scrollToSection("pricing")}>pricing</p>
          <p onClick={() => scrollToSection("faq")}>FAQ</p>
        </div>
        <p className="start-date">Start date: Enrollment Weekly</p>
      </div>

      <div className="single-program-details-container">
        <h2 id="program-details" className="single-program-section-title">
          Program Details
        </h2>
        <h3 className="single-program-details-title">
          What You’ll Learn On Our Software Development Course
        </h3>
        <p className="program-details-subtitle">
          Our program equips you with vital skills to thrive in a rapidly
          evolving workforce.
        </p>
        {/* Left Sidebar */}
        <div className="single-program-side-bar-container">
          <div className="single-program-sidebar">
            {sections.map((section) => (
              <div
                className="single-program-sidebar-item-container"
                key={section.id}
              >
                <div
                  className={`single-program-sidebar-item ${
                    activeSection === section.id ? "active" : ""
                  }`}
                  onClick={() => handleSectionClick(section.id)}
                >
                  {section.title}
                </div>
              </div>
            ))}
            {/* <button className="download-brochure">Download brochure</button> */}
          </div>

          {/* Main Content */}
          <div className="single-program-content">
            <h3>{activeContent?.title}</h3>
            {activeContent?.content}
          </div>
        </div>
      </div>

      <div className="vector-container">
        <img src={righthVector} alt="Vector" className="rightVector" />
      </div>
      <div className="single-program-page-flex">
        <div className="top-companies-section">
          <h2 className="top-companies-title">
            Top Tech Companies around the world hire <br /> our Graduates.
          </h2>
          <div className="companies-list">
            <img src={mendix} alt="Mendix" className="company" />
            <img src={hub} alt="Hub" className="company" />
            <img src={adyen} alt="Adyen" className="company" />
            <img src={deliveryHero} alt="DeliveryHero" className="company" />
            <img src={google} alt="Google" className="company" />
          </div>
        </div>

        <Description
          title="Why Learning :Lorem ipsum dolor sit amet ?"
          desc="The future of work is changing due to ai and data, secure your career with in-demand skills"
        />

        <div className="left-vector-container">
          <img src={leftVector} alt="Vector" className="leftVector" />
        </div>
        
        <WhyStart
          title="Cybersecurity Program"
          desc="In todays digital world, cybersecurity is essential for protecting sensitive data, maintaining public trust, and ensuring national security. As cyber threats grow more sophisticated, organizations need skilled professionals to safeguard their systems, prevent costly breaches, and keep operations secure. A comprehensive cybersecurity program equips individuals with the expertise to defend against these evolving threats, meeting regulatory requirements and supporting the safety of critical infrastructures."
        />

        <WhyEnroll />

        <div className="hands-on-labs-section">
          <div id="Hands-on-Labs" className="single-program-section-title">
            Hands-On Labs
          </div>

          <div className="handson-content">
            <div className="text-content">
              <h2 className="handson-title">Hands-On Labs</h2>
              <ul className="features-list">
                <li>Perform penetration tests on simulated systems.</li>
                <li>Analyze and reverse engineer malware.</li>
                <li>Create and implement cybersecurity policies.</li>
                <li>Respond to live cybersecurity incidents in real-time.</li>
              </ul>
              <h3 className="handson-title">Capstone Simulation</h3>
              <p className="capstone-description">
                Participate in a final capstone exercise simulating a full-scale
                cyberattack, from identification to mitigation and recovery.
              </p>
            </div>
            <img src={handson} alt="Hands-On Labs" className="lab-image" />
          </div>
        </div>

        <GainCertification
          sectionId="certification"
          certificateDesc="enhances your credibility, and opens doors to new career opportunities. It proves your ability to handle complex security challenges, aligns you with industry standards, and sets you apart in a competitive field. Invest in certification to make an impact and advance your career in cybersecurity."
        />

        {/* Testimonials Section */}
        <div className="testimonials-section">
          <div className="testimonials-left">
            <h2 className="single-program-section-title">Testimonials</h2>
            <h3 className="testimonials-subtitle">
              Why career changers and upskillers choose Code Institute
            </h3>
            <p className="testimonials-desc">
              See What Our Graduates Say, we’re proud to impact our students'
              journeys. Explore authentic stories and feedback from those who
              have taken our courses.
            </p>
          </div>
          <div className="testimonial-card-container">
            <TestimonialCard
              testimonial={testimonials[currentIndex]}
              onPrev={handlePrev}
              onNext={handleNext}
            />
          </div>
        </div>

        {/* <div className="enrollment-steps">
        <h1 className="section-title">How you apply ?</h1>
        <h2 className="enrollment-title">Steps to Enroll as a Student</h2>
        <p className="enrollment-description">
            From software engineering to AI, data analytics to business analysis.
            Gain the knowledge and skills of the future – and the confidence to
            transform your career.
        </p>
        <div className="steps-container">
            {steps.map((step) => (
                <HowToApplyCard key={step.step} {...step} />
            ))}
        </div>
      </div> */}

        <PaymentSection sectionId="pricing" />

        <AdditionalInfoSection sectionId="faq" />
      </div>

      <Footer />
    </div>
  );
}

export default SingleProgramPage;
