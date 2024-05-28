const mongoose = require("mongoose");

const rolesSchema = mongoose.Schema({
	name: String
},{
	versionKey: false,
	timestamps: true
})

module.exports = mongoose.model("roles", rolesSchema);