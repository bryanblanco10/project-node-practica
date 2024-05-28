const  express = require("express");

// controllers
const  userController = require("../controllers/userController.js");

const router = express.Router();
const path = "/api/user"

router.get(
	`${path}/`,
	userController.getData
)

router.post(
	`${path}/`,
	userController.insertData
)

router.put(
	`${path}/:_id`,
	userController.updateRecord
)

router.delete(
	`${path}/:_id`,
	userController.deleteRecord
)


module.exports = router;