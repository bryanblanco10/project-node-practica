"use strict"

const  express = require("express");
const  morgan = require("morgan");
const  bodyParser = require( "body-parser");
const initialSetup = require("./libs/initialSetup.js");

// router
const routes = require("./routes/routes.js");

const app = express();
initialSetup.createRoles();

// Middlewares
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({extended: false})); 
app.use(bodyParser.json());

//Routes
app.use(routes);
// app.use(uploadRouter);
// app.use(productRouter);
// app.use(authRouter);

module.exports = app;