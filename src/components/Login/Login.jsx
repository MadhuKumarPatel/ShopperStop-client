import FullPageLoader from "../FullPageLoader/FullPageLoader";
import { useState } from "react";
import { auth } from "../../Config";
import "./Login.css";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/slicers/userSlice";

function LoginPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [loginType, setLoginType] = useState("login");
  const [userCredentials, setUserCredentials] = useState({});
  const [error, setError] = useState("");
  const dispatch = useDispatch()

  onAuthStateChanged(auth, (user) => {
    if (user) {
      dispatch(setUser({id: user.uid , email: user.email}))
    } else {
      dispatch(setUser(null))
    }
    if(isLoading){
    setIsLoading(false)
    }
  });

  const handleCredentials = (e) => {
    setError("");
    setUserCredentials({ ...userCredentials, [e.target.name]: e.target.value });
  };

  const handelSignUp = (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(
      auth,
      userCredentials.email,
      userCredentials.password
    )
      .catch((error) => {
        setError(error.message);
      });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(
      auth,
      userCredentials.email,
      userCredentials.password
    )
      .catch((error) => {
        setError(error.message);
      });
  };

   const handlePasswordReset = () => {
      const email = prompt("Please enter your email.")
      sendPasswordResetEmail(auth , email)
      alert('Email sent! Check your inbox')
   }

  return (
    <>
      { isLoading && <FullPageLoader></FullPageLoader> }

      <div className="container login-page">
        <section>
          <h1>Welcome to the ShopperStop.</h1>
          <p>Login or create an account to continue</p>
          <div className="login-type">
            <button
              className={`btn ${loginType == "login" ? "selected" : ""}`}
              onClick={() => setLoginType("login")}
            >
              Login
            </button>
            <button
              className={`btn ${loginType == "signup" ? "selected" : ""}`}
              onClick={() => setLoginType("signup")}
            >
              Signup
            </button>
          </div>
          <form className="add-form login">
            <div className="form-control">
              <label>Email *</label>
              <input
                onChange={(e) => handleCredentials(e)}
                type="text"
                name="email"
                placeholder="Enter your email"
              />
            </div>
            <div className="form-control">
              <label>Password *</label>
              <input
                onChange={(e) => handleCredentials(e)}
                type="password"
                name="password"
                placeholder="Enter your password"
              />
            </div>
            {loginType === "login" ? (
              <button
                onClick={(e) => handleLogin(e)}
                className="active btn btn-block"
              >
                Login
              </button>
            ) : (
              <button
                onClick={(e) => handelSignUp(e)}
                className="active btn btn-block"
              >
                Sign Up
              </button>
            )}
            {error && <div className="error">{error}</div>}

            <p onClick={handlePasswordReset} className="forgot-password">Forgot Password?</p>
          </form>
        </section>
      </div>
    </>
  );
}

export default LoginPage;
