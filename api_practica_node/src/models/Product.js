const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
	name: String,
	description: String,
	category: String,
	price: Number,
	imgUrl: String
},{
	timestamps: true,
	versionKey: false
});

module.exports = mongoose.model("product", productSchema);