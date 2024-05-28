// librerias
const jwt = require("jsonwebtoken");

// models
const User = require("../models/UserN");
const Role = require("../models/Roles");

const config = require("../config");


exports.Register = async (req, res) =>{

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

}

exports.Login = async (req, res) =>{

	const {email, password } = req.body;

	// populate => trae todos los datos de la relacion
	const userFound = await User.findOne({email: email}).populate("roles");

	if(!userFound) return res.status(400).send({message: "User not found"});

	const matchPassword = await User.comparePassword(password, userFound.password);

	if(!matchPassword) return res.status(401).send({token: null, message: "Invalid password"});

	const token = jwt.sign({id: userFound._id}, config.secretWord.SECRET, {
		expiresIn: 86400 //24 hours
	});
	
	console.log(userFound);
	
	res.status(200).send({token});
}