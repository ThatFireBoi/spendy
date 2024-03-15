import { auth, provider } from "../../config/firebase-config";
import { signInWithPopup } from "firebase/auth";
import { Route, Routes, useNavigate } from "react-router-dom";
import { NavBar } from "../authentication/component/NavBar";
import { Inspiration } from "../authentication/component/navpages/Inspiration";
import { Features } from "../authentication/component/navpages/Features";
import { AboutUs } from "../authentication/component/navpages/About_us";

// import { Link } from "react-router-dom";
import "./styles.css";

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
        <section>
            <NavBar />
            <Routes path="/about" element={<AboutUs />}></Routes>
            <Routes path="/about" element={<AboutUs />}></Routes>
        </section>
        <body>
        <section>
            <article>
            <div className="user-login-page">
                <h3 style={{ fontSize: "100px" }}>Welcome to <span class="fancy">Spendy</span>, your favorite expense tracker</h3>
                <button className="login-with-google-account-btn" onClick={signInWithGoogle}> 
                    {" "}
                    Sign In
                </button>
                <div class="mouse"></div> 
            </div>
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
