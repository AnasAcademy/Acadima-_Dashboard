import React from "react";
import '../Styles/Services/Services.css';

import MainPageContainer from "../Components/Main/MainPageContainer";
import ServiceCard from "../Components/Services/ServiceCard";

function Services() {
  const services = [
    {
      title: "اسم الخدمة",
      description:
        "خدمة حجز تعمل لتأهيل الأشخاص للتسجيل المعتمد للحصول على شهادة *** يتم التقديم لهذه الخدمة بالتوجه من وحدة الاختبارات الإلكترونية.",
      price: 700,
    },
    {
      title: "اسم الخدمة",
      description:
        "خدمة حجز تعمل لتأهيل الأشخاص للتسجيل المعتمد للحصول على شهادة *** يتم التقديم لهذه الخدمة بالتوجه من وحدة الاختبارات الإلكترونية.",
      price: 700,
    },
    {
      title: "اسم الخدمة",
      description:
        "خدمة حجز تعمل لتأهيل الأشخاص للتسجيل المعتمد للحصول على شهادة *** يتم التقديم لهذه الخدمة بالتوجه من وحدة الاختبارات الإلكترونية.",
      price: 700,
    },
    {
      title: "اسم الخدمة",
      description:
        "خدمة حجز تعمل لتأهيل الأشخاص للتسجيل المعتمد للحصول على شهادة *** يتم التقديم لهذه الخدمة بالتوجه من وحدة الاختبارات الإلكترونية.",
      price: 0  ,
    },
    {
      title: "اسم الخدمة",
      description:
        "خدمة حجز تعمل لتأهيل الأشخاص للتسجيل المعتمد للحصول على شهادة *** يتم التقديم لهذه الخدمة بالتوجه من وحدة الاختبارات الإلكترونية.",
      price: 0,
    },
  ];

  return (
    <MainPageContainer>
    <div className="services-container">
      <h3 className="services-title">الخدمات الإلكترونية :</h3>
      <div className="services-grid">
        {services.map((service, index) => (
          <ServiceCard
            key={index}
            title={service.title}
            description={service.description}
            price={service.price}
          />
        ))}
      </div>
    </div>
  </MainPageContainer>
);
}

export default Services;
