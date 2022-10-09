import Home from "../Home";
import Quiz from "../Quiz";
import Register from "../Register";
import Leaderboard from "../Leaderboard";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/quiz" element={<Quiz />} />
          <Route exact path="/leaderboard" element={<Leaderboard />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
