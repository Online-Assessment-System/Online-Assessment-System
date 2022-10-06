import { Button, MenuItem, TextField } from "@material-ui/core";
import React,{useState } from "react";
import { useHistory } from "react-router";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import Categories from "../../Data/Categories";
import "./Home.css";

const Home = (/*{ name, setName, fetchQuestions }*/) => {
  const [name,setName] = useState('');
  const [difficulty, setDifficulty] = useState("");
  const [error, setError] = useState(false);

  const history = useHistory();

  const handleSubmit = () => {
    if (!difficulty || !name) {
      setError(true);
      return;
    } else {
      setError(false);
      // fetchQuestions(category, difficulty);
      history.push("/services/quizpage/quiz");
    }
  };
  
  return (
    <>
    <div className="content">
      <div className="settings">
        <span style={{ fontSize: 30 }}>ક્વિઝ સેટિંગ્સ</span>
        <div className="settings__select">
          {error && <ErrorMessage>કૃપા કરીને તમામ ક્ષેત્રો ભરો</ErrorMessage>}
          <TextField
            style={{ marginBottom: 25 }}
            label="તમારું નામ"
            variant="outlined"
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            select
            label="મુશ્કેલી સ્તર પસંદ કરો"
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
            variant="outlined"
            style={{ marginBottom: 30 }}
          >
            <MenuItem key="સરળ" value="easy">
              Easy
            </MenuItem>
            <MenuItem key="મધ્યમ" value="medium">
              Medium
            </MenuItem>
            <MenuItem key="મુશ્કેલ" value="hard">
              Hard
            </MenuItem>
          </TextField>
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={handleSubmit}
          >
            ક્વિઝ શરૂ કરો
          </Button>
        </div>
      </div>
      <img src="/quiz.svg" className="banner" alt="quiz app" />
    </div>
    </>
  );
};

export default Home;
