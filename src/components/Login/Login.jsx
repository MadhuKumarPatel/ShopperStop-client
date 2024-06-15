import FullPageLoader from "../FullPageLoader/FullPageLoader";
import { useEffect, useState } from "react";
import { auth } from "../../firebase/Config";
import "./Login.scss";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInAnonymously,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/slicers/userSlice";

function LoginPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [loginType, setLoginType] = useState("login");
  const [userCredentials, setUserCredentials] = useState({});
  const [error, setError] = useState("");
  const dispatch = useDispatch();

  // onAuthStateChanged(auth, (user) => {
  //   if (user) {
  //     dispatch(setUser({ id: user.uid, email: user.email }));
  //   } else {
  //     dispatch(setUser(null));
  //   }
  //   if (isLoading) {
  //     setIsLoading(false);
  //   }
  // });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(setUser({ id: user.uid, email: user.email }));
      } else {
        dispatch(setUser(null));
      }
      if (isLoading) {
        setIsLoading(false);
      }
    });

    return () => unsubscribe();
  }, [isLoading, dispatch]);

  const handleCredentials = (e) => {
    setError("");
    setUserCredentials({ ...userCredentials, [e.target.name]: e.target.value });
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (!userCredentials.email || !userCredentials.password) {
      setError("Please fill in all fields.");
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, userCredentials.email, userCredentials.password);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!userCredentials.email || !userCredentials.password) {
      setError("Please fill in all fields.");
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, userCredentials.email, userCredentials.password);
    } catch (error) {
      setError(error.message);
    }
  };

  const handlePasswordReset = async () => {
    const email = prompt("Please enter your email.");
    if (email) {
      try {
        await sendPasswordResetEmail(auth, email);
        alert("Email sent! Check your inbox.");
      } catch (error) {
        setError(error.message);
      }
    }
  };

  const handleGuestLogin = async () => {
    try {
      await signInAnonymously(auth);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <>
      {isLoading && <FullPageLoader></FullPageLoader>}

      <div className="container login-page">
        <section>
          <h1>Welcome to the ShopperStop.</h1>
          <p>Login or create an account to continue</p>
          <div className="login-type">
            <button
              className={`btn ${loginType === "login" ? "selected" : ""}`}
              onClick={() => setLoginType("login")}
            >
              Login
            </button>
            <button
              className={`btn ${loginType === "signup" ? "selected" : ""}`}
              onClick={() => setLoginType("signup")}
            >
              Signup
            </button>
            <div className="guestbtn">
            <button
              className="btn guest"
              onClick={handleGuestLogin}
            >
              Continue as Guest
            </button>
            </div>
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
                onClick={(e) => handleSignUp(e)}
                className="active btn btn-block"
              >
                Sign Up
              </button>
            )}
            {error && <div className="error">{error}</div>}

            <p onClick={handlePasswordReset} className="forgot-password">
              Forgot Password?
            </p>
          </form>
        </section>
      </div>
    </>
  );
}

export default LoginPage;
