require("dotenv").config();
const request = require("request");
const { QUIZ_API_KEY } = require("../config/config");

const practice = async (req, res) => {
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

module.exports = {
  practice,
};
