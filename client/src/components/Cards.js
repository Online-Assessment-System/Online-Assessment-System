import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import quiz from "../images/quiz.jpg";
import leaderboard from "../images/leaderboard.jpg";
import profile from "../images/profile.jpg";

import "../styles/Cards.css";

const CardView = ({ img, title }) => {
  return (
    <Card
      elevation={12}
      sx={{
        minHeight: 200,
        minWidth: 250,
        maxHeight: 275,
        maxWidth: 300,
        height: 275,
        width: 300,
      }}
    >
      <div
        style={{ display: "flex", justifyContent: "center", marginTop: "25px" }}
      >
        <img src={img} height={140} width={150} alt=""></img>
      </div>
      <CardContent>
        <Typography variant="h6" textAlign="center">
          {title}
        </Typography>
      </CardContent>
    </Card>
  );
};

const Cards = () => {
  return (
    <>
      <Typography
        variant="h3"
        component="h1"
        textAlign="center"
        sx={{ color: "black" }}
        pt={3}
      >
        Our Features
      </Typography>
      <div className="main-card-box">
        <div className="feature-box-main">
          <div className="feature-box">
            <CardView
              img={quiz}
              title="Students can take quiz of available subjects"
              alt="background_image_1"
            />
          </div>
          <div className="feature-box">
            <CardView
              img={leaderboard}
              title="Students can compare their results with the others"
              alt="background_image_2"
            />
          </div>
          <div className="feature-box">
            <CardView
              img={profile}
              title="Students can track their progress through profile"
              alt="background_image_3"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Cards;
