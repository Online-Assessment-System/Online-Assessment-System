import "./style.css";
import { shuffle } from "../utils";
import PropTypes from "prop-types";
import React, { useState } from "react";
import mindImg from "../../../images/mind.svg";
import { SERVER_URL } from "../../../config/config";
import {
  CATEGORIES,
  NUM_OF_QUESTIONS,
  DIFFICULTY,
  COUNTDOWN_TIME,
} from "../constants";
import {
  Container,
  Segment,
  Item,
  Dropdown,
  Divider,
  Button,
  Message,
} from "semantic-ui-react";

const Main = ({ startQuiz }) => {
  const [category, setCategory] = useState([]);
  const [numOfQuestions, setNumOfQuestions] = useState();
  const [difficulty, setDifficulty] = useState();
  const [countdownTime, setCountdownTime] = useState({
    hours: "",
    minutes: "",
    seconds: "",
  });
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState(null);

  const handleTimeChange = (e, { name, value }) => {
    setCountdownTime({ ...countdownTime, [name]: value });
  };

  let allFieldsSelected = false;
  if (
    category &&
    numOfQuestions &&
    difficulty &&
    (countdownTime.hours || countdownTime.minutes || countdownTime.seconds)
  ) {
    allFieldsSelected = true;
  }

  const convertQuestionObject = (oldElement) => {
    let _type =
      oldElement.multiple_correct_answers !== undefined &&
      oldElement.multiple_correct_answers === true
        ? "multiple"
        : "";

    let _options = [];
    if (oldElement.answers.answer_a !== null)
      _options.push(oldElement.answers.answer_a);
    if (oldElement.answers.answer_b !== null)
      _options.push(oldElement.answers.answer_b);
    if (oldElement.answers.answer_c !== null)
      _options.push(oldElement.answers.answer_c);
    if (oldElement.answers.answer_d !== null)
      _options.push(oldElement.answers.answer_d);
    if (oldElement.answers.answer_e !== null)
      _options.push(oldElement.answers.answer_e);
    if (oldElement.answers.answer_f !== null)
      _options.push(oldElement.answers.answer_f);

    let _correct_answer = [];
    if (oldElement.correct_answers.answer_a_correct === "true")
      _correct_answer.push(oldElement.answers.answer_a);
    if (oldElement.correct_answers.answer_b_correct === "true")
      _correct_answer.push(oldElement.answers.answer_b);
    if (oldElement.correct_answers.answer_c_correct === "true")
      _correct_answer.push(oldElement.answers.answer_c);
    if (oldElement.correct_answers.answer_d_correct === "true")
      _correct_answer.push(oldElement.answers.answer_d);
    if (oldElement.correct_answers.answer_e_correct === "true")
      _correct_answer.push(oldElement.answers.answer_e);
    if (oldElement.correct_answers.answer_f_correct === "true")
      _correct_answer.push(oldElement.answers.answer_f);

    let _incorrect_answer = [];
    if (oldElement.correct_answers.answer_a_correct === "false")
      _incorrect_answer.push(oldElement.answers.answer_a);
    if (oldElement.correct_answers.answer_b_correct === "false")
      _incorrect_answer.push(oldElement.answers.answer_b);
    if (oldElement.correct_answers.answer_c_correct === "false")
      _incorrect_answer.push(oldElement.answers.answer_c);
    if (oldElement.correct_answers.answer_d_correct === "false")
      _incorrect_answer.push(oldElement.answers.answer_d);
    if (oldElement.correct_answers.answer_e_correct === "false")
      _incorrect_answer.push(oldElement.answers.answer_e);
    if (oldElement.correct_answers.answer_f_correct === "false")
      _incorrect_answer.push(oldElement.answers.answer_f);

    const newElement = {
      category: oldElement.category,
      difficulty: oldElement.difficulty,
      type: _type,
      question: oldElement.question,
      options: _options,
      correct_answer: _correct_answer,
      incorrect_answers: _incorrect_answer,
    };
    return newElement;
  };

  const fetchData = async () => {
    setProcessing(true);

    if (error) setError(null);

    const res = await fetch(SERVER_URL + "/api/quiz/practice", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        tag: category,
        difficulty,
        limit: numOfQuestions,
      }),
      credentials:"include",
    });

    const data = await res.json();

    setTimeout(() => {
      if (!data.success) {
        const message = <p>{data.message}</p>;
        setProcessing(false);
        setError({ message });
        return;
      }

      const results = JSON.parse(data.data);

      let finalResults = [];
      results.forEach((element) => {
        let newElement = convertQuestionObject(element);
        newElement.options = shuffle(newElement.options);
        finalResults.push(newElement);
      });

      setProcessing(false);
      startQuiz(
        finalResults,
        countdownTime.hours + countdownTime.minutes + countdownTime.seconds,
        category
      );
    }, 1000);
  };

  return (
    <Container>
      <Segment className="main-box">
        <Item.Group divided>
          <Item>
            <div className="img-main-box">
              <Item.Image src={mindImg} size="medium" />
            </div>
            <Item.Content>
              <Item.Header style={{ marginTop: "1em" }}>
                <h1>Practice Quiz</h1>
              </Item.Header>
              {error && (
                <Message error onDismiss={() => setError(null)}>
                  <Message.Header>Error!</Message.Header>
                  {error.message}
                </Message>
              )}
              <Divider />
              <Item.Meta>
                <Dropdown
                  fluid
                  selection
                  name="category"
                  placeholder="Select Quiz Category"
                  header="Select Quiz Category"
                  options={CATEGORIES}
                  value={category}
                  onChange={(e, { value }) => setCategory(value)}
                  disabled={processing}
                  
                />
                <br />
                <Dropdown
                  fluid
                  selection
                  name="numOfQ"
                  placeholder="Select No. of Questions"
                  header="Select No. of Questions"
                  options={NUM_OF_QUESTIONS}
                  value={numOfQuestions}
                  onChange={(e, { value }) => setNumOfQuestions(value)}
                  disabled={processing}
                />
                <br />
                <Dropdown
                  fluid
                  selection
                  name="difficulty"
                  placeholder="Select Difficulty Level"
                  header="Select Difficulty Level"
                  options={DIFFICULTY}
                  value={difficulty}
                  onChange={(e, { value }) => setDifficulty(value)}
                  disabled={processing}
                />
                <br />
                <Dropdown
                  search
                  selection
                  name="hours"
                  placeholder="Select Hours"
                  header="Select Hours"
                  options={COUNTDOWN_TIME.hours}
                  value={countdownTime.hours}
                  onChange={handleTimeChange}
                  disabled={processing}
                />
                <Dropdown
                  search
                  selection
                  name="minutes"
                  placeholder="Select Minutes"
                  header="Select Minutes"
                  options={COUNTDOWN_TIME.minutes}
                  value={countdownTime.minutes}
                  onChange={handleTimeChange}
                  disabled={processing}
                />
                <Dropdown
                  search
                  selection
                  name="seconds"
                  placeholder="Select Seconds"
                  header="Select Seconds"
                  options={COUNTDOWN_TIME.seconds}
                  value={countdownTime.seconds}
                  onChange={handleTimeChange}
                  disabled={processing}
                />
              </Item.Meta>
              <Divider />
              <Item.Extra>
                <Button
                  primary
                  size="big"
                  icon="play"
                  labelPosition="left"
                  content={processing ? "Processing..." : "Play Now"}
                  onClick={fetchData}
                  disabled={!allFieldsSelected || processing}
                />
              </Item.Extra>
            </Item.Content>
          </Item>
        </Item.Group>
      </Segment>
      <br />
    </Container>
  );
};

Main.propTypes = {
  startQuiz: PropTypes.func.isRequired,
};

export default Main;
