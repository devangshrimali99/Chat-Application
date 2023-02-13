import { React, useState } from "react";
import addAvatar from "../img/addAvatar.png";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db, storage } from "../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [err, setErr] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const file = e.target[3].files[0];
    try {
      //     //Create user
      const res = await createUserWithEmailAndPassword(auth, email, password);
      //     //Create a unique image name
      const date = new Date().getTime();
      const storageRef = ref(storage, `${displayName + date}`);
      await uploadBytesResumable(storageRef, file).then(() => {
        getDownloadURL(storageRef).then(async (downloadURL) => {
          try {
            //           //Update profile
            await updateProfile(res.user, {
              displayName,
              photoURL: downloadURL,
            });
            //           //create user on firestore
            await setDoc(doc(db, "users", res.user.uid), {
              uid: res.user.uid,
              displayName,
              email,
              photoURL: downloadURL,
            });
            //           //create empty user chats on firestore
            await setDoc(doc(db, "userChats", res.user.uid), {});
            navigate("/");
          } catch (err) {
            console.log(err);
            setErr(true);
            setLoading(false);
          }
        });
      });
    } catch (err) {
      setErr(true);
      setLoading(false);
    }
  };

  const handleLogIn = (e) => {
    e.preventDefault();
    let path = "/login";
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
              <span>Create</span> an account
            </div>
            <span className="login__description">
              Sign up to get started with WeChat
            </span>
          </div>
          <div>
            <div className="login__inputs">
              <div>
                <label htmlFor="" className="login__label">
                  Name
                </label>
                <input
                  required
                  type="text"
                  placeholder="Enter your name"
                  className="login__input"
                />
              </div>
              <div>
                <label htmlFor="" className="login__label">
                  Email
                </label>
                <input
                  required
                  type="email"
                  placeholder="Enter  your email address"
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
              <div>
                <label htmlFor="file" className="login__label">
                  Add an avatar
                </label>
                <input
                  required
                  type="file"
                  id="file"
                  className="login__input"
                ></input>
              </div>
              {err && <span>Something went wrong ! </span>}
            </div>
          </div>
          <div>
            <div className="login__buttons">
              <button type="submit" className="login__button">
                Sign Up
              </button>
              <button
                className="login__button login__button-ghost"
                onClick={handleLogIn}
              >
                Log In
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
