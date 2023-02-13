import { React, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import addAvatar from "../img/addAvatar.png";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import background from "../img/bg-login.png";
const Login = () => {
  const [err, setErr] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (err) {
      setErr(true);
    }
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    let path = "/register";
    navigate(path);
  };

  return (
    <div className="container__login">
      <div className="login__content">
        <img
          src="https://images.squarespace-cdn.com/content/v1/569837eedf40f3de9427d2bc/1591167849523-0BHYLR83D2YVJDAS8I14/B000AS007_499+v3.jpg?format=2500w"
          className="login__img"
        />
        <form onSubmit={handleSubmit} className="login__form">
          <div>
            <div className="login__title">
              <span>Welcome</span> Back
            </div>
            <span className="login__description">
              Welcome! Please login to continue.
            </span>
          </div>
          <div>
            <div className="login__inputs">
              <div>
                <label htmlFor="" className="login__label">
                  Email
                </label>
                <input
                  required
                  type="email"
                  placeholder="Enter your email address"
                  className="login__input"
                />
              </div>
              <div>
                <label htmlFor="" className="login__label">
                  Password
                </label>
                <div className="login__box">
                  <input
                    required
                    type="password"
                    placeholder="Enter your password"
                    className="login__input"
                  />
                </div>
              </div>
              {err && <span>Something went wrong ! </span>}
            </div>
          </div>
          <div>
            <div className="login__buttons">
              <button type="submit" className="login__button">
                Log In
              </button>
              <button
                className="login__button login__button-ghost"
                onClick={handleSignUp}
              >
                Sign Up
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
