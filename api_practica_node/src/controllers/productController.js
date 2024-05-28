const Product = require("../models/Product");

// crear product
exports.createProduct = async (req, res) => {

	const {name, description, category, price, imgUrl} = req.body;

	const newProduct = new Product({name, description, category, price, imgUrl});

	const productSave = await newProduct.save();

	res.status(201).send({data:productSave});

}

// obtener todos los  products
exports.getProducts = async (req, res) => {

	const products = await Product.find();

	res.status(200).send({data:products});

}

// obtener un product
exports.getProductById = async (req, res) => {

	const { _id } = req.params;

	const product = await Product.findById(_id);
	res.status(200).send({"data": product});
	
}

// actualizar un product
exports.updateProductById = async (req, res) => {

	const { _id } = req.params;
	const data = req.body;

	const product = await Product.findByIdAndUpdate(_id, data,{
		new: true
	});

	res.status(200).send({"data": product});

}

// eliminar un product
exports.deleteProductById = async (req, res) => {

	const { _id } = req.params;

	const product = await Product.findByIdAndDelete(_id);

	res.status(200).send({"data": product});
}

