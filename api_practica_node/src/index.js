"use strict"

const  app = require("./app.js");
const  initDB = require("./config/db.js");

// port
const port = process.env.PORT || 3000

app.listen(port, () =>{
	console.log("Api practica");
});

initDB();


