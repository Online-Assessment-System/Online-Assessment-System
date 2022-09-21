import "../styles/App.css";
import { useState } from "react";
import Home from "./Home";
import Quiz from "./Quiz/Quiz";
import Register from "./Register";
import Start from "./Quiz/Start";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  const [quizData, setQuizData] = useState();
  return (
    <>
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/register" element={<Register />} />
          <Route
            exact
            path="/quiz"
            element={<Quiz setQuizData={setQuizData} />}
          />
          <Route
            exact
            path="/quiz/start"
            element={<Start quizData={quizData} />}
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
