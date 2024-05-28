
const jwt = require("jsonwebtoken");
const config = require("../config");
const User = require("../models/UserN");
const Role = require("../models/Roles");

exports.verifyToken = (req, res, next) =>{
	
	try{

		const token = req.headers["x-access-token"];

		if(!token) return res.status(403).send({message: "Not token provided"});

		// extraemos el id del token
		const decoded = jwt.verify(token, config.secretWord.SECRET,)
		req.userId = decoded.id

		// buscamos el user por id
		const user = User.findById(req.userId, {password: 0})

		if(!user) return res.status(404).send({message: "Usuario no autotizado para crear products"});

		next();

	}catch(err){

		res.status(401).send({message: "Unauthorized"});

	}
};

exports.isModerator = async (req, res, next) => {

	const user = await User.findById(req.userId);

	const roles = await Role.find({_id: {$in: user.roles}});

	for (let i = 0; i < roles.length; i++){

		if(roles[i].name === "moderador"){
			next()
			return;
		}

	}

	res.status(403).send({messae: "Require Moderator role"});

};

exports.isAdmin = async (req, res, next) => {

	const user = await User.findById(req.userId);

	const roles = await Role.find({_id: {$in: user.roles}});

	for (let i = 0; i < roles.length; i++){

		if(roles[i].name === "admin"){
			next()
			return;
		}

	}

	res.status(403).send({messae: "Require Admin role"});

};