import {React, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SERVER_URL } from "../config/config.js";
import { ToastContainer, toast } from "react-toastify";
import "../styles/Register.css";
import "react-toastify/dist/ReactToastify.css";

const Register = () => {
  const navigate = useNavigate();

  const [userDetails, setUserDetails] = useState({ email: "", password: "" });
  
	const setDetails = (e) => {
    const name = e.target.name,
      value = e.target.value;
    setUserDetails({ ...userDetails, [name]: value });
  };
  
	const check = () => {
    if (!/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(userDetails.email)) {
      SendErrorMessage("Invalid Email");
      return false;
    }
    if (userDetails.password.length < 8) {
      SendErrorMessage("Password is too short");
      return false;
    }
    return true;
  };
  
	const SendErrorMessage = (message) => {
    toast.error(message, {
      position: "top-right",
      autoClose: 10000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const register = async (e) => {
    e.preventDefault();
    if (!check()) {
      return;
    }
  
		const { email, password } = userDetails;

    const res = await fetch(SERVER_URL + "/api/user/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();
    if (res.status === 400) {
      toast.error(data.message, { position: "top-right" });
    } else {
      toast.success(data.message, { position: "top-right" });
      setTimeout(() => {
        navigate("/", { replace: true });
      }, 3000);
    }
  };

  const login = async (e) => {
    e.preventDefault();
    if (!check()) {
      return;
    }
  
		const { email, password } = userDetails;

    const res = await fetch(SERVER_URL + "/api/user/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();
    if (res.status === 400) {
      toast.error(data.message, { position: "top-right" });
    } else {
      toast.success(data.message, { position: "top-right" });
      setTimeout(() => {
        navigate("/", { replace: true });
      }, 3000);
    }
  };

  return (
    <>
      <div className="main">
        <input type="checkbox" id="chk" aria-hidden="true" />
        <div className="signup">
          <form>
            <label htmlFor="chk" aria-hidden="true">
              Sign Up
            </label>
            <input
              type="email"
              id="emailR"
              name="email"
              autoComplete="on"
              value={userDetails.email}
              onChange={setDetails}
              placeholder="Email"
            />
            <input
              type="password"
              id="passwordR"
              name="password"
              autoComplete="on"
              value={userDetails.password}
              onChange={setDetails}
              placeholder="Password"
              required
            />
            <button className="custom-btn" onClick={register}>
              Register
            </button>
          </form>
        </div>
        <div className="login">
          <form>
            <label htmlFor="chk" aria-hidden="true">
              Login
            </label>
            <input
              type="email"
              id="emailL"
              name="email"
              autoComplete="on"
              value={userDetails.email}
              onChange={setDetails}
              placeholder="Email"
            />
            <input
              type="password"
              id="passwordL"
              name="password"
              autoComplete="on"
              value={userDetails.password}
              onChange={setDetails}
              placeholder="Password"
              required
            />
            <button className="custom-btn" onClick={login}>
              LogIn
            </button>
          </form>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default Register;