import Main from "./Main";
import Page from "./Page";
import Layout from "./Layout";
import Loader from "./Loader";
import Result from "./Result";
import React, { useState } from "react";

const Quiz = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [countdownTime, setCountdownTime] = useState(null);
  const [isQuizStarted, setIsQuizStarted] = useState(false);
  const [isQuizCompleted, setIsQuizCompleted] = useState(false);
  const [resultData, setResultData] = useState(null);
  const [category, setCategory] = useState('');

  const startQuiz = (data, countdownTime, category) => {
    setLoading(true);
    setCountdownTime(countdownTime);
    setCategory(category);
    setTimeout(() => {
      setData(data);
      setIsQuizStarted(true);
      setLoading(false);
    }, 1000);
  };

  const endQuiz = (resultData) => {
    setLoading(true);

    setTimeout(() => {
      setIsQuizStarted(false);
      setIsQuizCompleted(true);
      setResultData(resultData);
      setLoading(false);
    }, 2000);
  };

  return (
    <Layout>
      {loading && <Loader />}
      {!loading && !isQuizStarted && !isQuizCompleted && (
        <Main startQuiz={startQuiz} />
      )}
      {!loading && isQuizStarted && (
        <Page
          data={data}
          countdownTime={Number(countdownTime)}
          endQuiz={endQuiz}
          category = {category}
        />
      )}
      {!loading && isQuizCompleted && (
        <Result {...resultData} saved={false}  />
      )}
    </Layout>
  );
};

export default Quiz;
