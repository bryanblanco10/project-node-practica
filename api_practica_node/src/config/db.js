const  mongoose = require("mongoose");

const BD_URI = `mongodb://localhost:27017/my_bd_practica`;

module.exports = () =>{

	const connect = () =>{

		mongoose.connect(

			BD_URI,
			{
				keepAlive: true,
				useNewUrlParser: true,
				useUnifiedTopology: true,
				useFindAndModify: true,
				useCreateIndex: true
			},
			(err) =>{

				if(err){
					console.log("Error al conectar");
				}else{
					console.log("Conección correcta");
				}
				
			}

		);

	};

	connect();

};