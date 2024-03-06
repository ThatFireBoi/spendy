import { auth, provider } from "../../config/firebase-config";
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
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
        <div className="user-login-page">
            <h3 style={{ fontSize: "100px" }}>Welcome to <span class="fancy">Spendy</span></h3>
            <button className="login-with-google-account-btn" onClick={signInWithGoogle}> 
                {" "}
                Sign In
            </button> 
        </div>
    );
};
