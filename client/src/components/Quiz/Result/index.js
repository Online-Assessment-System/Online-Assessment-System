import QNA from "./QNA";
import Stats from "./Stats";
import PropTypes from "prop-types";
import React, { useState } from "react";
import { Container, Menu } from "semantic-ui-react";
import { SERVER_URL } from "../../../config/config";
import { ToastContainer, toast } from "react-toastify";

const Result = ({
  totalQuestions,
  correctAnswers,
  timeTaken,
  questionsAndAnswers,
  category,
  saved,
}) => {
  const [activeTab, setActiveTab] = useState("Stats");
  const [saveDone, setSaveDone] = useState(false); 
  const handleTabClick = (e, { name }) => {
    setActiveTab(name);
  };

  const saveQuizData = async () => {
    if(saved || saveDone){
      return;
    }
    const res = await fetch(SERVER_URL + "/api/quiz/save", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ totalQuestions, correctAnswers, timeTaken, questionsAndAnswers, category}),
      credentials: 'include',
    });

    const data = await res.json();
    if(!data.success){
      toast.error(data.message, { position: "top-right" });
    }

    setSaveDone(true);
  };
  saveQuizData();
  return (
    <Container>
      <Menu fluid widths={2}>
        <Menu.Item
          name="Stats"
          active={activeTab === "Stats"}
          onClick={handleTabClick}
        />
        <Menu.Item
          name="QNA"
          active={activeTab === "QNA"}
          onClick={handleTabClick}
        />
      </Menu>
      {activeTab === "Stats" && (
        <Stats
          totalQuestions={totalQuestions}
          correctAnswers={correctAnswers}
          timeTaken={timeTaken}
        />
      )}
      {activeTab === "QNA" && <QNA questionsAndAnswers={questionsAndAnswers} />}
      <br />
      <ToastContainer/>
    </Container>
  );
};

Result.propTypes = {
  totalQuestions: PropTypes.number.isRequired,
  correctAnswers: PropTypes.number.isRequired,
  timeTaken: PropTypes.number.isRequired,
  questionsAndAnswers: PropTypes.array.isRequired,
  saved: PropTypes.bool.isRequired,
};

export default Result;
