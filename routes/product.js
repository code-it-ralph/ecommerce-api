const express = require("express");
const router = express.Router();
const auth = require("../auth");

const productController = require("../controllers/product");


// Adding a Product
router.post("/", auth.verify, (req, res) => {

	const userData = auth.decode(req.headers.authorization)

    productController.addProduct(req.body, {userId: userData.id, isAdmin:userData.isAdmin}).then(result => res.send(result))
});


// Route for Retrieving All Active Products
router.get("/", (req, res) => {
	productController.getAllActive().then(result => res.send(result));
});

// Route for Retrieving All Products
router.get("/all", (req, res) => {
	productController.getAllProducts().then(result => res.send(result));
});


// Route for Retrieving a Specific Product
router.get("/:productId", (req, res) => {
	productController.getProduct(req.params).then(result => res.send(result));
});


// Route for Updating a Product Information
router.put("/:productId", auth.verify, (req, res) => {

	const userData = auth.decode(req.headers.authorization);

	productController.updateProduct(req.params, req.body, {isAdmin: userData.isAdmin})
	.then(result => res.send(result));
})


// Route for Archiving a Product
router.put("/:productId/archive", auth.verify, (req, res) => {

	const userData = auth.decode(req.headers.authorization);

	productController.archiveProduct(req.params, {userId: userData.id, isAdmin: userData.isAdmin})
	.then(result => res.send(result));
})

// Route for Unarchiving a Product
router.put("/:productId/unarchive", auth.verify, (req, res) => {

	const userData = auth.decode(req.headers.authorization);

	productController.unarchiveProduct(req.params, {userId: userData.id, isAdmin: userData.isAdmin})
	.then(result => res.send(result));
})




module.exports = router;