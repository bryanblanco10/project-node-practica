const Role = require("../models/Roles.js");

exports.createRoles = async () => {

	try{

		//Contar los documentos existentes en la bd.
		const count = await Role.estimatedDocumentCount();

		if(count > 0) return;

		//Guardar multiples datos al mismo tiempo.
		const values = await Promise.all([

			new Role({name: "user"}).save(),
			new Role({name: "moderador"}).save(),
			new Role({name: "admin"}).save()
			
		]);

		console.log(values);

	} catch(err){

		console.error(err);

	}

};