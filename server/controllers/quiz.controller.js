require("dotenv").config();
const request = require("request");
const User = require("../models/user.model");
const { QUIZ_API_KEY } = require("../config/config");

const practice = async (req, res) => {
  if(req.message === "Invalid Access"){
    return res.status(req.status).json({
      message: "Please Login First...",
      success: false
    })
  }
  try {
    const tag = req.body.tag;
    const difficulty = req.body.difficulty;
    const limit = req.body.limit;

    const req_url =
      "https://quizapi.io/api/v1/questions?apiKey=" +
      QUIZ_API_KEY +
      "&limit=" +
      limit +
      "&difficulty=" +
      difficulty +
      "&tags=" +
      tag;

    request(req_url, function (error, response) {
      const data = response.body;
      if (response.statusCode === 200) {
        return res.status(200).json({
          message: "Quiz is created",
          success: true,
          data: data,
        });
      } else {
        console.log("Error in practice : ", error);
        return res.status(400).json({
          message: "Some API issue is there! Please contact adminstration",
          success: false,
        });
      }
    });
  } catch (error) {
    console.log("Error in practice : ", error);
    return res.status(500).json({
      message: "Internal error! Try again",
      success: false,
    });
  }
};

const save = async (req, res) => {
  const quizData = req.body;
  const user = await User.findOne({ email: req.cookies.email });
  if(user){
    const response = await user.addQuiz(quizData);
    if(response==1){
      return res.status(200).json({
        "message": 'Quiz data is added successfully',
        success: true,    
      });
    }else{
      return res.status(400).json({
        "message": 'Internal Error Occurred!',
        success: false,    
      });
    }
  }else{
      return res.status(400).json({
        "message": 'Internal Error Occurred!',
        success: false,    
      });
    }
};

const getAccuracy = (quizData) => {
  let totalScore = 0, totalQuestions = 0;
  for(let id = 0; id < quizData.length; id++){
    totalScore += Number(quizData[id].correctAnswers);
    totalQuestions += Number(quizData[id].totalQuestions);
  }
  return totalScore/totalQuestions;
}

const getSpeed = (quizData) => {
  let totalTime = 0, totalQuestions = 0;
  for(let id = 0; id < quizData.length; id++){
    totalTime += Number(quizData[id].timeTaken);
    totalQuestions += Number(quizData[id].correctAnswers);
  }
  return totalTime/totalQuestions;
}

const readAll = async (req, res) => {
  try{
    const users = await User.find();
    let responseData = [];
    for(let id = 0; id < users.length; id++){
      let obj = {
        'email' : users[id].email,
        'country' : users[id].country,
        'accuracy' : getAccuracy(users[id].quiz),
        'speed' : getSpeed(users[id].quiz),
      }
      responseData.push(obj);
    }
    return res.status(200).json({
      data : responseData,
      success : true,
    });
  }catch(error){
    return res.status(400).json({
      message : 'Internal Error! Try again...', 
      success : false,
    });
  }

}

module.exports = {
  practice,
  save,
  readAll,
};
