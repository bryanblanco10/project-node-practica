const express = require("express");

// controller
const uploadController = require("../controllers/uploadController");

const router = express.Router();

const path = "/api/upload";

router.post(
	`${path}/`,
	uploadController.upload,
	uploadController.uploadFile
)

module.exports = router;