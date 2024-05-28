const mongoose = require("mongoose");
const bcript = require("bcryptjs");

const userSchema = mongoose.Schema({

	username:{
		type: String,
		unique: true
	},
	email:{
		type: String,
		unique: true
	},
	password:{
		type: String,
		required: true
	},
	roles: [{
		ref: "roles",
		type: mongoose.Schema.Types.ObjectId
	}]

},{
	versionKey: false,
	timestamps: true
});


userSchema.statics.encryptPassword = async (password) =>{

	const salt = await bcript.genSalt(10);

	return await bcript.hash(password, salt);

}

userSchema.statics.comparePassword = async (password, receivedPassword) =>{

	// true o false
	return await bcript.compare(password, receivedPassword);

}

module.exports = mongoose.model("userAuth", userSchema);