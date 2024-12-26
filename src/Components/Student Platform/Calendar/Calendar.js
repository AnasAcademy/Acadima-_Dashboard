import React, { useState, useEffect } from "react";
import {
  format,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  subMonths,
  addMonths,
} from "date-fns";
import { arSA } from "date-fns/locale"; // Import Arabic locale
import "../../../Styles/Student Platform/Calendar.css";

import previous from "../../../Images/Previous.svg";
import next from "../../../Images/Next.svg";
import noEvents from "../../../Images/noEvents.svg";

function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [events, setEvents] = useState({});
  const [loading, setLoading] = useState(false);

  // Dummy Data for Testing
  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);

      try {
        const data = [
          {
            date: "2024-12-10",
            time:"12:00",
            title: "محاضرة أساسيات تجربة المستخدم",
            type: "lecture", 
            link: "",
          },
          {
            date: "2024-12-10",
            time:"2:00",
            title: "تسليم مشروع تخرج الفترة الأولى",
            type: "assignment", 
            link: "",
          },
          {
            date: "2024-12-10",
            time:"4",
            title: "اجتماع مشروع التخرج",
            type: "meeting",
            link: "",
          },
          {
            date: "2024-12-16",
            time:"12:00",
            title: "تسليم مشروع تخرج الفترة الأولى",
            type: "assignment", 
            link: "",
          },
          {
            date: "2024-12-11",
            time:"12:00",
            title: "اجتماع مشروع التخرج",
            type: "meeting",
            link: "",
          },{
            date: "2024-12-27",
            time:"5:00",
            title: "اجتماع مشروع التخرج",
            type: "meeting",
            link: "",
          },
          {
            date: "2024-12-04",
            time:"10:00",
            title: "اجتماع مشروع التخرج",
            type: "meeting",
            link: "",
          },
        ];
        

        // Format data
        const formattedEvents = data.reduce((acc, event) => {
          const eventDate = format(new Date(event.date), "yyyy-MM-dd");
          acc[eventDate] = acc[eventDate] || [];
          acc[eventDate].push({
            title: event.title,
            time: event.time,
            type: event.type,
            link: event.link,
            color: event.type === "assignment" ? "red" : event.type === "lecture" ? "blue" : "green",
          });
          return acc;
        }, {});
        

        setEvents(formattedEvents);
      } catch (error) {
        console.error("Error fetching events:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, [currentDate]);

  const handleDateClick = (date) => {
    // console.log("Selected Date:", date);
    setSelectedDate(date);
  };

  const renderEvents = () => {
    const selectedDateString = format(selectedDate, "yyyy-MM-dd");
    // console.log(
    //   "Rendering events for selected date:",
    //   selectedDate,
    //   selectedDateString
    // ); // Debug log

    const selectedDayEvents = events[selectedDateString] || [];

    return (
      <div className="events-container">
        <h3 className="events-container-title">المهام لهذا اليوم :</h3>
        <div className="events-list-container">
          {loading ? (
            <p>جاري تحميل الأحداث...</p>
          ) : selectedDayEvents.length > 0 ? (
            selectedDayEvents.map((event, index) => (
              <div key={index} className="event-item">
                <span
                  className="event-color"
                  style={{ backgroundColor: event.color }}
                ></span>
                <span className="event-time">{event.time}</span>
                <div className="event-details">
                  <p className="event-title">{event.title}</p>
                  <a href={event.link} className="event-link">
                    الوصول الى صفحة التسليم
                  </a>
                </div>
              </div>
            ))
          ) : (
            <div className="no-events">
              <p className="no-events-title">
                لا يوجد أي مهام أو أحداث مهمة لليوم
              </p>
              <div className="no-events-placeholder">
                <img src={noEvents} alt="noEvents" className="noEvents-image" />
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderHeader = () => {
    // console.log("Current Date:", currentDate);
    return (
      <div className="calendar-header">
        <div className="arrows-container">
          <button
            className="arrow-button"
            onClick={() => setCurrentDate(subMonths(currentDate, 1))}
          >
            <img src={previous} alt="previous" className="arrow" />
          </button>
          <button
            className="arrow-button"
            onClick={() => setCurrentDate(addMonths(currentDate, 1))}
          >
            <img src={next} alt="next" className="arrow" />
          </button>
        </div>
        <h2 className="current-month">
          {format(currentDate, "MMMM yyyy", { locale: arSA })}
        </h2>
      </div>
    );
  };

  const renderDaysOfWeek = () => (
    <div className="calendar-days">
      {["سبت", "جمعة", "خميس", "اربعاء", "ثلاثاء", "اثنين", "أحد"].map(
        (day, index) => (
          <div key={index} className="calendar-day-name">
            {day}
          </div>
        )
      )}
    </div>
  );

  const renderDates = () => {
    const monthStart = startOfMonth(currentDate);
    const monthEnd = endOfMonth(currentDate);

    const startDate = startOfWeek(monthStart, { locale: arSA });
    const endDate = endOfWeek(monthEnd, { locale: arSA });

    const rows = [];
    let days = [];
    let day = new Date(startDate.getTime()); // Clone startDate

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        const formattedDate = format(day, "yyyy-MM-dd");
        const isSelected =
          format(day, "yyyy-MM-dd") === format(selectedDate, "yyyy-MM-dd");
        const isCurrentDay =
          format(day, "yyyy-MM-dd") === format(new Date(), "yyyy-MM-dd");
        const hasEvents = events[formattedDate]?.length > 0;

        const dayClass = `
          calendar-day 
          ${isCurrentDay ? "current-day" : ""} 
          ${isSelected ? "selected" : ""} 
          ${hasEvents ? "has-events" : ""} 
          ${format(day, "MM") !== format(monthStart, "MM") ? "disabled" : ""}
        `;

        days.push(
          <div
            key={formattedDate}
            className={dayClass}
            onClick={() => handleDateClick(formattedDate)} // Clone the day properly
          >
            {format(day, "d")}
          </div>
        );

        // Increment day safely
        day = new Date(day.getTime() + 24 * 60 * 60 * 1000);
      }
      rows.push(
        <div className="calendar-week" key={day}>
          {days}
        </div>
      );
      days = [];
    }
    return <div className="calendar-dates">{rows}</div>;
  };

  return (
    <div className="custom-calendar">
      {renderHeader()}
      {renderDaysOfWeek()}
      {renderDates()}
      {renderEvents()}
    </div>
  );
}

export default Calendar;
