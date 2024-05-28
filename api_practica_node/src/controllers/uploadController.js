const  multer = require("multer");

//Funcion para definir la carpeta donde se guardaran los archivos y el nombre del archivo

const storage = multer.diskStorage({
	destination: (req, file, cb) =>{
		cb(null, "uploads");
	},
	filename: (req, file, cb) => {
		cb(null, `${Date.now()}-${file.originalname }`);
	}
});

const upload = multer({ storage: storage });

exports.upload = upload.single("myFile");


exports.uploadFile = (req, res) => {
	res.status(200).send({mensagge: "Upload file"})
}