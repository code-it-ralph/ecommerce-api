const express = require('express');
const router = express.Router();
const auth = require("../auth");

const orderController = require('../controllers/order');


// Route for Retrieving All Orders by ADMIN
router.get('/orders', auth.verify, (req, res) => {

	const userData = auth.decode(req.headers.authorization);

	orderController.getAllOrders({userId: userData.id, isAdmin: userData.isAdmin, orders: userData.orders}).then(result => res.send(result));
});


// // Route for Retrieving authenticated user’s orders
// router.get('/my_orders', auth.verify, (req, res) => {

// 	const userData = auth.decode(req.headers.authorization);

// 	let data = {
// 		userId: userData.id,
// 		productId: req.body.productId,
// 		quantity: req.body.quantity
// 	}

// 	orderController.myOrder(data, {userId: userData.id, isAdmin: userData.isAdmin, orders: userData.orders}).then(result => res.send(result));
// })

// Route for Retrieving authenticated user’s orders
router.get('/my_orders/', auth.verify, (req, res) => {

	const userData = auth.decode(req.headers.authorization);

	let data = {
		userId: userData.id,
		productId: req.body.productId,
		quantity: req.body.quantity
	}

	orderController.myOrder(data, {userId: userData.id, isAdmin: userData.isAdmin, orders: userData.orders}).then(result => res.send(result));
})

module.exports = router;