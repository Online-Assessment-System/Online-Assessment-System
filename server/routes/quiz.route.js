const router = require("express").Router();
const quizController = require("../controllers/quiz.controller.js");

router.post("/practice", quizController.practice);

module.exports = router;