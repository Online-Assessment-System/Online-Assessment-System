import Home from "../Home";
import Quiz from "../Quiz";
import Review from "../Review";
import Profile from "../Profile";
import { useState } from "react";
import Register from "../Register";
import Leaderboard from "../Leaderboard";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

const App = () => {
  const [reviewData, setReviewData] = useState(null);
  return (
    <>
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/quiz" element={<Quiz />} />
          <Route exact path="/leaderboard" element={<Leaderboard />} />
          <Route exact path="/profile" element={<Profile setReviewData={setReviewData} />} />
          <Route exact path="/review/" element={<Review reviewData={reviewData}/>} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
