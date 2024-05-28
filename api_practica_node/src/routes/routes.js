const  userRouter  = require("./user.js");
const  uploadRouter = require("./uploadFile.js");
const  productRouter = require("./product.js");
const  authRouter = require("./auth.routes");
const  userAuthRouter = require("./user.routes");

const routes = [
	userRouter,
	uploadRouter,
	productRouter,
	authRouter,
	userAuthRouter
]

module.exports = routes;