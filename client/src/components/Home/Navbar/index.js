import "./style.css";
import React, { useState} from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom"; 
import HomeIcon from "@mui/icons-material/Home";
import LoginIcon from "@mui/icons-material/Login";
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
import { ToastContainer, toast } from "react-toastify";
import PodcastsIcon from "@mui/icons-material/Podcasts";
import MenuSharpIcon from "@mui/icons-material/MenuSharp";
import CloseSharpIcon from "@mui/icons-material/CloseSharp";
import LeaderboardIcon from "@mui/icons-material/Leaderboard";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";

const getCookie = (cookie_name) => {
  let name = cookie_name + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let cookie_array = decodedCookie.split(';');
  for(let i = 0; i <cookie_array.length; i++) {
    let c = cookie_array[i];
    while (c.charAt(0) === ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

const deleteCookies = () => {
  var allCookies = document.cookie.split(';');

  for (var i = 0; i < allCookies.length; i++)
      document.cookie = allCookies[i] + "=;expires=" + new Date(0).toUTCString();

};

const Navbar = () => {

  const navigate = useNavigate();

  const [isMenuBtnClicked, setIsMenuBtnClicked] = useState(false);

  const isLoggedin = () => {
    let token = getCookie('token');
    if(token === ''){
      return false;
    }else{
      return true;
    }
  }

  const logoutUtil = () => {
    deleteCookies();
    toast.success("User is logged out successfully", { position: "top-right" });
    setTimeout(() => {
      navigate("/", { replace: true });
    }, 3000);
  }

  const handleMenuClick = () => {
    const curr_state = isMenuBtnClicked;
    setIsMenuBtnClicked(!curr_state);
  };

  return (
    <>
      <nav className="mynavbar">
        <div className="mynavbar-container">
          <Link to="/" className="navbar-logo">
            <PodcastsIcon style={{ fontSize: "1.5em" }} />
            &nbsp;&nbsp;Online Assessment System
          </Link>
          <div className="menu-icon" onClick={handleMenuClick}>
            {isMenuBtnClicked ? (
              <CloseSharpIcon fontSize="large" />
            ) : (
              <MenuSharpIcon fontSize="large" />
            )}
          </div>
        </div>
        <ul
          className={
            isMenuBtnClicked ? "mynav-menu mynav-menu-active" : "mynav-menu"
          }
        >
          <li className="mynav-item">
            <Link to="/" className="mynav-links">
              <HomeIcon sx={{ fontSize: "1.25em" }} />
              &nbsp;&nbsp;Home&nbsp;
            </Link>
          </li>
          <li className="mynav-item">
            <Link to="/quiz" className="mynav-links">
              <QuestionAnswerIcon sx={{ fontSize: "1.25em" }} />
              &nbsp;&nbsp;Practice&nbsp;
            </Link>
          </li>
          <li className="mynav-item">
            <Link to="/leaderboard" className="mynav-links">
              <LeaderboardIcon sx={{ fontSize: "1.25em" }} />
              &nbsp;&nbsp;Leaderboard&nbsp;
            </Link>
          </li>
          {
            (isLoggedin() === false
              ?<li className="mynav-item">
                <Link to="/register" className="mynav-links">
                  <LoginIcon sx={{ fontSize: "1.25em" }} />
                  &nbsp;&nbsp;Register&nbsp;
                </Link>
              </li>
              :
              <div className="logout-profile">
                <li>
                  <Link to="/profile" className="mynav-links">
                    <PersonIcon sx={{ fontSize: "1.25em" }} />
                    &nbsp;&nbsp;Profile&nbsp;
                  </Link>
                </li>
                <li className="logout-btn" onClick={logoutUtil}>
                  <Link className="mynav-links">
                    <LogoutIcon sx={{ fontSize: "1.25em"}} />
                    <p className="logout-p">&nbsp;&nbsp;Logout&nbsp;</p>
                  </Link>
                </li>
              </div>
            )
          }
        </ul>
      </nav>
      <ToastContainer/>
    </>
  );
};

export default Navbar;
