const router = require("express").Router();
const userController = require("../controllers/user.controller.js");
const authenticate = require("../middleware/authenticate.js");

router.post("/register", userController.register);
router.post("/login", userController.login);
router.get("/read", authenticate, userController.read);
router.post("/update",userController.update);
router.get("/visualizer",authenticate, userController.visualizer);

module.exports = router;