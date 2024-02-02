import { auth, provider } from "../../config/firebase-config";
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
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
            <p>Sign In with Your Google Account to Proceed</p>
            <button classname="login-with-google-account-btn" onClick={signInWithGoogle}> 
                {" "}
                Sign In
            </button> 
        </div>
    );
};
