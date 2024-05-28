const Roles = require("../models/Roles");
const User = require("../models/UserN");

exports.checkDuplicateUsernameOrEmail = async (req, res, next) => {

	const { username, email } = req.body;
	console.log(email)

	const userFound = await User.findOne({username: username});

	if(userFound) return res.status(403).send({message: `Username ${username} exists`});

	const userFound2 = await User.findOne({email: email});

	if(userFound2) return res.status(403).send({message: `Email ${email} exists`});

	next();
};

exports.checkRolesExisted = async (req, res, next) => {

	const { roles } = req.body;

	const rolesFound = await Roles.find();

	const rolesFound2 = rolesFound.map(rol => {
		return rol.name
	})

	if(roles){

		for (let i = 0; i < roles.length; i++){

			if(!rolesFound2.includes(roles[i])){
				return res.status(400).send({message: `Role ${roles[i]} does not exists`});
			}
		}
	}

	next();

};

exports.checkUserExisted = async (req, res, next) => {
	const { _id } = req.params
	console.log(_id)

	try{
		
		const user = await User.findOne({_id: _id});

		if(!user) return res.status(400).send({message: "User not exists"});

		next();

	} catch(err){
		res.status(400).send(err);
	}
}