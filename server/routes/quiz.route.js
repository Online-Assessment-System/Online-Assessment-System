const router = require("express").Router();
const authenticate = require("../middleware/authenticate");
const quizController = require("../controllers/quiz.controller.js");

router.post("/practice", authenticate, quizController.practice);
router.post("/save", quizController.save);
router.get("/readAll", quizController.readAll);

module.exports = router;