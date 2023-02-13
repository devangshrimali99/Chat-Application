import React, { useContext } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { AuthContext } from "../context/AuthContext";
const Navbar = () => {
  const { currentUser } = useContext(AuthContext);
  return (
    <div className="navbar">
      <span className="logo">WeChat</span>
      <div className="user">
        <img src={currentUser.photoURL} alt="" />
        <span className="name">{currentUser.displayName}</span>
        <button className="logout" onClick={() => signOut(auth)}>
          Log Out
        </button>
      </div>
    </div>
  );
};

export default Navbar;
