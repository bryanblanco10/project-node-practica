const authJwt = require("./authJwt");
const verifySignup = require("./verifySignup");

const middlewares = {

	authJwt, 
	verifySignup
}

module.exports = middlewares;