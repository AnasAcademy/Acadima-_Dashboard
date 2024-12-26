import React, { useState, useEffect } from "react";
import "../Styles/Program/Program.css";
import { apiUrl } from "../API";

import MainPageContainer from "../Components/Main/MainPageContainer";
import ProgramCard from "../Components/Program/ProgramCard";

import payment from "../Images/Sidebar icons/payment.svg";

function Program() {
  // Sample data for programs
  // const programs = [
  //   {
  //     id: 1,
  //     title: "الدبلوم المتوسط المشترك في التصميم المرئي والتسويق الرقمي",
  //     earlyRegistrationFee: "6233 ر.س",
  //     installmentFee: "6958 ر.س",
  //     installments: [
  //       "2346 رس القسط الأول للتسجيل",
  //       "110 ر.س تاريخ استحقاق القسط الثاني 1 يوليو 2024",
  //       "150 ر.س تاريخ استحقاق القسط الثاني 1 يوليو 2024",
  //       "50 ر.س تاريخ استحقاق القسط الثاني 1 يوليو 2024",
  //       "11 ر.س تاريخ استحقاق القسط الثاني 1 يوليو 2024",
  //       "1150 ر.س تاريخ استحقاق القسط الثاني 1 يوليو 2024",
  //     ],
  //     isPaid: false,
  //   },
  //   {
  //     id: 2,
  //     title: "الدبلوم المتخصص المتوسط في التصميم المرئي",
  //     earlyRegistrationFee: "5233 ر.س",
  //     installmentFee: "5958 ر.س",
  //     installments: [
  //       "2346 ر.س القسط الأول للتسجيل",
  //       "1150 ر.س تاريخ استحقاق القسط الثاني 1 يوليو 2024",
  //       "1150 ر.س تاريخ استحقاق القسط الثاني 1 يوليو 2024",
  //       "1150 ر.س تاريخ استحقاق القسط الثاني 1 يوليو 2024",
  //       "1150 ر.س تاريخ استحقاق القسط الثاني 1 يوليو 2024",
  //       "1150 ر.س تاريخ استحقاق القسط الثاني 1 يوليو 2024",
  //     ], // Provide an empty array if no installments
  //     isPaid: true,
  //   },
  //   {
  //     id: 3,
  //     title: "الدبلوم المتخصص المتوسط في التصميم المرئي",
  //     earlyRegistrationFee: "5233 ر.س",
  //     installmentFee: "5958 ر.س",
  //     installments: [
  //       "2346 ر.س القسط الأول للتسجيل",
  //       "1150 ر.س تاريخ استحقاق القسط الثاني 1 يوليو 2024",
  //       "1150 ر.س تاريخ استحقاق القسط الثاني 1 يوليو 2024",
  //       "1150 ر.س تاريخ استحقاق القسط الثاني 1 يوليو 2024",
  //       "1150 ر.س تاريخ استحقاق القسط الثاني 1 يوليو 2024",
  //       "1150 ر.س تاريخ استحقاق القسط الثاني 1 يوليو 2024",
  //     ], // Provide an empty array if no installments
  //     isPaid: true,
  //   },
  //   {
  //     id: 4,
  //     title: "الدبلوم المتخصص المتوسط في التصميم المرئي",
  //     earlyRegistrationFee: "5233 ر.س",
  //     installmentFee: "5958 ر.س",
  //     installments: [
  //       "2346 ر.س القسط الأول للتسجيل",
  //       "1150 ر.س تاريخ استحقاق القسط الثاني 1 يوليو 2024",
  //       "1150 ر.س تاريخ استحقاق القسط الثاني 1 يوليو 2024",
  //       "1150 ر.س تاريخ استحقاق القسط الثاني 1 يوليو 2024",
  //     ], // Provide an empty array if no installments
  //     isPaid: true,
  //   },
  // ];

  const [programs, setPrograms] = useState([]);

  const token = localStorage.getItem("token");

  const fetchProgramsData = async () => {
    try {
      const response = await fetch(apiUrl + "/panel/programs/applieds", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": "1234",
          "ngrok-skip-browser-warning": true,
          Authorization: "Bearer " + token,
          accept: "application/json",
        },
      });

      const result = await response.json();
      // console.log(result);
      setPrograms(result.data);
      // console.log(result.data);

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProgramsData();
  }, []);

  return (
    <MainPageContainer>
      <div className="programs-container">
        <div className="programs-top">
          <div className="section">
            <img
              src={payment}
              alt="payment"
              className="payment-icon"
              style={{ width: "30px", height: "30px" }}
            />
            <p className="section-p">دفع رسوم البرنامج</p>
          </div>
        </div>
        <div className="programs-list">
          {programs?.length > 0 ? (
            programs?.map((program) => (
              <ProgramCard key={program?.id} program={program} />
            ))
          ) : (
            <p className="no-programs">لا توجد برامج متاحة حالياً</p>
          )}
        </div>
      </div>
    </MainPageContainer>
  );
}

export default Program;
