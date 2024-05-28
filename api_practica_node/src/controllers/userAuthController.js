//Librerias
const jwt = require("jsonwebtoken");

// Models
const User = require("../models/UserN");
const Role = require("../models/Roles");

const config = require("../config");

exports.createUser = async (req, res) => {

	const { username, email, password, roles } = req.body

	const newUser = new User({
		username,
		email,
		password: await User.encryptPassword(password)
	});

	// roles
	if(roles){
		// $in => Si en una de ellas
		const foundRoles = await Role.find({name: {$in: roles}});
		// Agregar ids de los roles al newUser
		newUser.roles = foundRoles.map(role => role._id);
	} else{
		const role = await Role.findOne({name: "user"});

		newUser.roles = [role._id];
	}

	const savedUser = await newUser.save();

	console.log(savedUser);

	//dato que se guarda dentro del token, palabra secreta, objeto de configuración.
	const token = jwt.sign({id: savedUser._id}, config.secretWord.SECRET, {
		expiresIn: 86400 // 24 hours
	});

	res.status(200).send({token});

};


exports.getUsers = async (req, res) => {

	try{

		const users = await User.find();

		res.status(200).send(users);

	}catch(err){
		res.status(500).send(err);
	}

};

exports.getUser = async (req, res) => {
	const { _id } = req.params
	try{

		const user = await User.findById({_id: _id});

		res.status(200).send(user);

	}catch(err){
		res.status(500).send(err);
	}

};


exports.updateUser = async (req, res) => {
	
	const { username, email, password, roles } = req.body

	const newUser = new User({
		username,
		email,
		password: await User.encryptPassword(password)
	});

	// roles
	if(roles){
		// $in => Si en una de ellas
		const foundRoles = await Role.find({name: {$in: roles}});
		// Agregar ids de los roles al newUser
		newUser.roles = foundRoles.map(role => role._id);
	} else{
		const role = await Role.findOne({name: "user"});

		newUser.roles = [role._id];
	}

	const savedUser = await newUser.save();

	console.log(savedUser);

	//dato que se guarda dentro del token, palabra secreta, objeto de configuración.
	const token = jwt.sign({id: savedUser._id}, config.secretWord.SECRET, {
		expiresIn: 86400 // 24 hours
	});

	res.status(200).send({token});

};


exports.deleteUser = async (req, res) => {
	const { _id } = req.params
	try{

		const user = await User.findByIdAndDelete({_id: _id});

		res.status(200).send({message: "User deleted"});

	}catch(err){
		res.status(500).send(err);
	}

};