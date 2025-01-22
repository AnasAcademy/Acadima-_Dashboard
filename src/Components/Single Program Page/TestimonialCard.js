import React from "react";
import "../../Styles/SingleProgramPage/TestimonialCard.css";

function TestimonialCard({ testimonial, onPrev, onNext}) {
  return (
    <div className="testimonial-card">
      <h3>{testimonial.title}</h3>
      <p className="testimonial-content">{testimonial.content}</p>
      <div className="testimonial-author">
        <p><strong>{testimonial.author}</strong></p>
        <p>{testimonial.author_desc}</p>
      </div>
      <div className="card-navigation">
        <button onClick={onPrev}>
          &#9664; {/* Left Arrow */}
        </button>
        <button onClick={onNext}>
          &#9654; {/* Right Arrow */}
        </button>
      </div>
    </div>
  );
}

export default TestimonialCard;
