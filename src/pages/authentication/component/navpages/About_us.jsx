import headshot from "./Gabriels_profesional_shots.jpeg";
import headshot2 from "./Natalia_profesional_shot.jpeg";
import "..navpages/styles.css";
import React from "react";

const AboutUs = () => {
  return (
      <div className="about-us" id="about-us">
          <h2><span className="fancy">About us</span></h2>
          <p>
          We're Gabriel Castro and Natalia Rivera, two aspiring developers excited to embark on this journey in the world of tech.
          As newcomers to the realm of software development, we're eager to learn, grow, and make a positive impact through our work. With a passion for problem-solving and a commitment to continuous improvement, we're diving headfirst into the world of coding, ready to tackle any challenge that comes our way.
          </p>
          <p>
          we're always open to feedback, suggestions, and new connections. If you'd like to learn more about us or connect with us further, feel free to check out our GitHub and LinkedIn profiles:
          </p>
          <div>
          <img src={headshot} alt="headshot" className="headshot"/>
          <img src={headshot2} alt="headshot" className="headshot"/>
          </div>
          <div>
              <a href="https://www.linkedin.com/in/gabrielcastroflores/" className="button-linkedin" >Gabriel's LinkedIn</a>
              <a href="https://www.linkedin.com/in/nataliagrivera/" className="button-linkedin">Natalia's LinkedIn</a>
          </div>
          <div className="github links">
              <a href="https://github.com/ThatFireBoi" className="button-git">Gabriel's GitHub</a>
              <a href="https://github.com/nataliagrivera" className="button-git">Natalia's GitHub</a>
          </div>
      </div>
  );
}