const  express = require("express");

// controllers
const userController = require("../controllers/userAuthController");

//middlewares
const middlewares = require("../middlewares/index");

const router = express.Router();
const path = "/api/userAuth"

// crear usuario
router.post(
	`${path}/`,
	[
		middlewares.authJwt.verifyToken, 
		middlewares.authJwt.isAdmin,
		middlewares.verifySignup.checkDuplicateUsernameOrEmail, 
		middlewares.verifySignup.checkRolesExisted
	],
	userController.createUser
);

router.get(
	`${path}/`,
	[
		middlewares.authJwt.verifyToken, 
		middlewares.authJwt.isAdmin
	],
	userController.getUsers
);

router.get(
	`${path}/:_id`,
	[
		middlewares.authJwt.verifyToken, 
		middlewares.authJwt.isAdmin
	],
	userController.getUser
);

router.put(
	`${path}/:_id`,
	[
		middlewares.authJwt.verifyToken, 
		middlewares.authJwt.isAdmin,
		middlewares.verifySignup.checkUserExisted,
		middlewares.verifySignup.checkDuplicateUsernameOrEmail, 
		middlewares.verifySignup.checkRolesExisted
	],
	userController.updateUser
);

router.delete(
	`${path}/:_id`,
	[
		middlewares.authJwt.verifyToken, 
		middlewares.authJwt.isAdmin
	],
	userController.deleteUser
)


module.exports = router;