const  express = require("express");
const router = express.Router();

//middlewares
const middlewares = require("../middlewares/index");

// controller
const authController = require("../controllers/authController");
const path = "/api/auth";

//Registrar usuario
router.post(
	`${path}/register`,
	authController.Register,
	[
		middlewares.verifySignup.checkDuplicateUsernameOrEmail, 
		middlewares.verifySignup.checkRolesExisted
	],
)

//Loguear usuario
router.post(
	`${path}/login`,
	authController.Login
)


module.exports = router;