import * as React from "react";
import { useState } from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import "../../styles/Start.css";

const Option = ({ params }) => {
  const updateAnswer = (e) => {
    const value = e.target.value;

    params.setAnswer(
      params.answer.map((item) =>
        item.id === params.key ? { ...item, answer: value } : { ...item }
      )
    );
  };
  return (
    <>
      <FormControl>
        <RadioGroup
          aria-labelledby="demo-controlled-radio-buttons-group"
          name="controlled-radio-buttons-group"
          value={params.answer[params.key - 1].answer}
          onChange={updateAnswer}
        >
          {params.options.answer_a !== null ? (
            <FormControlLabel
              name="answer_a"
              value="answer_a"
              control={<Radio />}
              label={params.options.answer_a}
            />
          ) : (
            <></>
          )}
          {params.options.answer_b !== null ? (
            <FormControlLabel
              name="answer_b"
              value="answer_b"
              control={<Radio />}
              label={params.options.answer_b}
            />
          ) : (
            <></>
          )}
          {params.options.answer_c !== null ? (
            <FormControlLabel
              name="answer_c"
              value="answer_c"
              control={<Radio />}
              label={params.options.answer_c}
            />
          ) : (
            <></>
          )}
          {params.options.answer_d !== null ? (
            <FormControlLabel
              name="answer_d"
              value="answer_d"
              control={<Radio />}
              label={params.options.answer_d}
            />
          ) : (
            <></>
          )}
          {params.options.answer_e !== null ? (
            <FormControlLabel
              name="answer_e"
              value="answer_e"
              control={<Radio />}
              label={params.options.answer_e}
            />
          ) : (
            <></>
          )}
          {params.options.answer_f !== null ? (
            <FormControlLabel
              name="answer_f"
              value="answer_f"
              control={<Radio />}
              label={params.options.answer_f}
            />
          ) : (
            <></>
          )}
        </RadioGroup>
      </FormControl>
    </>
  );
};

const Question = ({ params }) => {
  return (
    <>
      <div className="question">
        <div className="question-box">
          <span style={{ paddingRight: "15px", margin: "10px" }}>
            {params.key}
          </span>
          <p style={{ margin: "10px" }}>{params.question.question}</p>
        </div>
        <div className="option-box">
          <Option
            params={{
              key: params.key,
              options: params.question.answers,
              answer: params.answer,
              setAnswer: params.setAnswer,
            }}
          />
        </div>
      </div>
    </>
  );
};

const Start = ({ quizData }) => {
  const data = JSON.parse(quizData);

  let arr = [];
  for (let i = 0; i < data.length; i++) {
    let obj = { id: i + 1, answer: "" };
    arr.push(obj);
  }

  const [answers, setAnswers] = useState(arr);

  let result = [];
  for (let i = 0; i < data.length; i++) {
    result.push(
      <Question
        key={i}
        params={{
          question: data[i],
          key: i + 1,
          answer: answers,
          setAnswer: setAnswers,
        }}
      />
    );
  }
  return <>{result}</>;
};

export default Start;
