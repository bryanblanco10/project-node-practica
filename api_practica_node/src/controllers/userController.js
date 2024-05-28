const  model = require("../models/user.js");
const  mongoose = require("mongoose");

// pagination
const options = {
	page: 1,
	limit: 10
};

//Transformar id en un objectId
const parseId = (id) => {
	return mongoose.Types.ObjectId(id);
};

// Obtener todos los usuarios
exports.getData = (req, res) => {

	model.paginate({}, options, (err, docs) =>{

		if(err){
			res.status(422).send({error: "error"});
		}else{
			res.status(200).send({data:docs});
		}

	});

};


//Insertar usuarios
exports.insertData = (req, res) => {
	const data = req.body;
	
	model.create(data, (err, docs) =>{

		if(err){
			res.status(422).send({error: "Error"});
		}else{
			res.status(200).send({data:docs});
		}

	});

};

exports.updateRecord = (req, res) =>{
	const { _id } = req.params
	const data = req.body

	model.updateOne(
	 { _id: parseId(_id) },
	 data,
	 (err, docs) => {
	 		if(err){
	 			res.status(422).send({err: "error"});
	 		}else{
	 			res.status(200).send({data: docs});
	 		}
	 }
	)

};

exports.deleteRecord = (req, res) => {
	const { _id } = req.params

	model.deleteOne(
	 { _id: parseId(_id) },
	 (err, docs) => {
	 		if(err){
	 			res.status(422).send({err: "error"});
	 		}else{
	 			res.status(200).send({data: docs});
	 		}
	 }
	)
}