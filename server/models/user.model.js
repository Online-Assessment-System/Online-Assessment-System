const mongoose = require("mongoose");
const jwt = require('jsonwebtoken');

const {SECRET_KEY} = require('../config/config');

const userSchema = new mongoose.Schema({
    email: { type: String, required: true },  
    password: { type: String, required: true },
    name: { type: String, default: "Your Name"},
    mobile: { type:String, default: "9876543210"},
    country: { type: String, default: "India"},
    token : { type : String},
    quiz: [{
      totalQuestions: { type: Number, required: true },
      correctAnswers: { type: Number, required: true },
      timeTaken: { type: Number, require: true},
      questionsAndAnswers: { type:Object, required: true},
      time: { type: Date, default: Date.now },
  }],
  },
  {
    timestamps: true,
  } 
);

userSchema.methods.generateAuthToken = async function () {
  try {
      const token = jwt.sign({ _id: this._id }, SECRET_KEY);
      this.token = token;
      await this.save();
      return token;
  } catch (error) {
      return -1;
  }
}

userSchema.methods.updataDetails = async function (user){
  try{
    this.name = user.name;
    this.mobile = user.mobile;
    this.country = user.country;
    await this.save();
    return 1;
  }catch (error) {
    return 0;
  }
}

userSchema.methods.addQuiz = async function (quiz){
  try{
    const quizData = {
      totalQuestions : Number(quiz.totalQuestions),
      correctAnswers : Number(quiz.correctAnswers),
      timeTaken : Number(quiz.timeTaken),
      questionsAndAnswers: quiz.questionsAndAnswers, 
    }
    this.quiz.push(quizData);
    await this.save();
    return 1;
  }catch (error) {
    return 0;
  }
};

const User = mongoose.model("User", userSchema);
module.exports = User;