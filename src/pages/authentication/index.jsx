import { auth, provider } from "../../config/firebase-config";
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import "./styles.css";

const Header = () => {
    return (
    <header className="header">
        <p><span class="fancy">SPENDY</span></p>
            <nav>
                <ul>
                    <li><a href="Inspiration">What inspires us</a></li>
                    <li><a href="Features">Features</a></li>
                    <li><a href="AboutUs">About us</a></li>
                </ul>
            </nav>
        </header>
    );
};

const Inspiration = () => {
    return (
        <div>
            <h2>What inspires us</h2>
            <p>
                We believe that everyone should be able to track their expenses
                and know where their money is going. We also believe that
                everyone should be able to do that in a simple and easy way.
            </p>
        </div>
    );
}

const Features = () => {
    return (
        <div className="features">
            <h2>Features</h2>
            <p>
                Spendy is a simple and easy to use expense tracker that allows
                you to track your expenses and know where your money is going.
            </p>
        </div>
    );
}

const AboutUs = () => {
    return (
        <div className="about-us">
            <h2>About us</h2>
            <p>
                Spendy was created by a group of developers who wanted to make
                tracking expenses simple and easy.
            </p>
        </div>
    );
}

const Footer = () => {
    return <footer className="Footer">This is the footer</footer>;
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
            <Header />
        <div className="user-login-page">
            <h3 style={{ fontSize: "100px" }}>Welcome to Spendy your</h3>
            <button className="login-with-google-account-btn" onClick={signInWithGoogle}> 
                {" "}
                Sign In
            </button>
            <div class="mouse"></div> 
        </div>
        <div>
        <section>
            <Inspiration />
        </section>
        </div>
        <div>
        <section>
            <Features />
        </section>
        </div>
        <div>
        <section>
            <AboutUs />
        </section>
        </div>
        </div>
    );
};
