const express = require("express");

// controllers
const productsController = require("../controllers/productController");

//middlewares
const middlewares = require("../middlewares/index");

const router = express.Router();
const path = "/api/product"

//Obtener todos los products
router.get(
	`${path}`,
	productsController.getProducts
)

//Obtener un product
router.get(
	`${path}/:_id`,
	productsController.getProductById
)

//Crear un product
router.post(
	`${path}/`,
	[middlewares.authJwt.verifyToken, middlewares.authJwt.isModerator],
	productsController.createProduct
)

//Actualizar un product
router.put(
	`${path}/:_id`,
	[middlewares.authJwt.verifyToken, middlewares.authJwt.isAdmin],
	productsController.updateProductById
)

//Eliminar un product
router.delete(
	`${path}/:_id`,
	[middlewares.authJwt.verifyToken, middlewares.authJwt.isAdmin],
	productsController.deleteProductById
)

module.exports = router;