import { auth, provider } from "../../config/firebase-config";
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import React from "react";
import headshot from "./Gabriel_proffesional.jpg";
import headshot2 from "./Natalia_proffesional.jpeg";
import mibancoImage from "./mibanco.jpg";
import tracker from "./tracker.png";
import transactions from "./transactions.png";
import achievements from "./achievements.png";
import chart from "./chart-image.jpeg";
// import { Link } from "react-router-dom";
import "./styles.css";

const NavBar = () => {
    return (
        <nav>
            <ul>
                <ul><a href="#inspiration">Inspiration</a></ul>
                <ul><a href="#features">Features</a></ul>
                <ul><a href="#about-us">About Us</a></ul>
            </ul>
        </nav>
    );
};

const Inspiration = () => {
    return (
      <div className="inspiration" id="inspiration">
        <h2><span className="fancy">What inspires us</span></h2>
        <div className="inspiration-content">
          <p>
            Our journey began as two employees of Banco Popular, selected for a unique opportunity at Holberton Coding School, 
            fully sponsored to innovate in project-based learning. Inspired by Banco Popular's MiBanco app, we recognized its potential for enhancement.
            </p>
            <img src={mibancoImage} alt="MiBanco" className="mibancoImage" />
            <p>
            Our goal was clear: to create a tool that could be incorporated into MiBanco, making it as user-friendly as possible but also injecting elements 
            of gamification to incentivize user engagement. The result is a fusion of our banking expertise and coding skills, delivering a more intuitive 
            and rewarding experience for our users.
          </p>
          <img src={chart} alt="Chart" className="chart" />
        </div>
      </div>
    );
  };

    const Features = () => {
    return (
        <div className="features" id="features">
            <th><span className="fancy">Features</span></th>
            <table>
                <tr>
                    <td>
                        <h3>Easy Tracking</h3>
                        <p>Our app makes expense tracking effortless. With user-friendly interfaces and streamlined workflows, you can easily input, categorize, and analyze your expenses in just a few clicks. Say goodbye to complicated spreadsheets and clunky interfaces, and hello to simplicity and efficiency.</p>
                        <img src={tracker} alt="Tracker" className="Tracker" />
                    </td>
                    <td>
                        <h3>Intuitive Visuals</h3>
                        <p>Experience your financial data in a whole new light with our intuitive visuals. Our app offers a single, sleek graph that displays your income and expenses by category, providing a clear overview of your financial landscape. With just a glance, you can see where your money is going and make informed and fast decisions about your spending.</p>
                        <img src={transactions} alt="Transactions" className="Transactions" />
                    </td>
                    <td>
                        <h3>Achievements</h3>
                        <p>Stay motivated on your financial journey with our achievements feature. Track your progress as you achieve financial milestones, from sticking to your budget to increasing your savings. Our app celebrates your successes and encourages you to keep striving for financial stability and success. With achievable goals and meaningful rewards, you'll feel empowered to take control of your finances and achieve your financial dreams.</p>
                        <img src={achievements} alt="Achievements" className="Achievements" />
                    </td>
                </tr>
            </table>
        </div>
    );
};

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
                <a href="https://www.linkedin.com/in/gabrielcastroflores/" target="_blank" rel="noreferrer" className="button-linkedin" >Gabriel's LinkedIn</a>
                <a href="https://www.linkedin.com/in/nataliagrivera/" target="_blank" rel="noreferrer" className="button-linkedin">Natalia's LinkedIn</a>
            </div>
            <div className="github links">
                <a href="https://github.com/ThatFireBoi" target="_blank" rel="noreferrer" className="button-git">Gabriel's GitHub</a>
                <a href="https://github.com/nataliagrivera" target="_blank" rel="noreferrer" className="button-git">Natalia's GitHub</a>
            </div>
            <div className="twitter links">
                <a href="https://twitter.com/Matute09" target="_blank" rel="noreferrer" className="button-twitter">Gabriel's Twitter</a>
            </div>
        </div>
    );
}; 

export const Auth = () => {

    const navigate = useNavigate();

    const signInWithGoogle = async () => {
        const results = await signInWithPopup(auth, provider);
        const authInformation = {
            userID: results.user.uid,
            userName: results.user.displayName,
            profilePicture: results.user.photoURL,
            isAuth: true,
        };
        localStorage.setItem("auth", JSON.stringify(authInformation));
        navigate("/expense-tracker");
    };
    return (
        <div className="landing-page">
        <body>
        <section>
            <article>
            <div className="user-login-page">
                <h3 style={{ fontSize: "110px" }}>Welcome to <span class="fancy">Spendy</span>, your favorite expense tracker</h3>
                <h2 style={{ color: "white" }}>Track your expenses, visualize your spending, and achieve your financial goals with Spendy.</h2>
                <button className="login-with-google-account-btn" onClick={signInWithGoogle}> 
                    {" "}
                    Sign In
                </button>
                <div class="mouse"></div> 
            </div>
            </article>
        </section>
        <section>
                <article className="navbar">
                <NavBar />
                </article>
            </section>
        <div>
            <section>
                <article className="inspiration">
                <Inspiration />
                </article>
            </section>
        </div>
        <div>
            <section>
                <article>
                <Features />
                </article>
            </section>
        </div>
        <div>
            <section>
                <article>
                <AboutUs />
                </article>
            </section>
        </div>
        </body>
        </div>
    );
};
