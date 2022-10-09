import React, { useState } from "react";
import { Link } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import LoginIcon from "@mui/icons-material/Login";
import PodcastsIcon from "@mui/icons-material/Podcasts";
import MenuSharpIcon from "@mui/icons-material/MenuSharp";
import CloseSharpIcon from "@mui/icons-material/CloseSharp";
import LeaderboardIcon from "@mui/icons-material/Leaderboard";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import "../styles/Navbar.css";

const Navbar = () => {
  const [isMenuBtnClicked, setIsMenuBtnClicked] = useState(false);

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
          <li className="mynav-item">
            <Link to="/register" className="mynav-links">
              <LoginIcon sx={{ fontSize: "1.25em" }} />
              &nbsp;&nbsp;Register&nbsp;
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Navbar;
