import Navbar from "../Home/Navbar";
import Result from "../Quiz/Result";

const Review = (props) => {
  const resultData = {
    totalQuestions : props.reviewData.totalQuestions,
    correctAnswers : props.reviewData.correctAnswers,
    timeTaken : props.reviewData.timeTaken,
    questionsAndAnswers : props.reviewData.questionsAndAnswers,
  }
  return (
    <>
      <Navbar/>
      <div style={{height:'3em'}}/>
      <Result {...resultData} saved={true} />
    </>
  )
};

export default Review;
