const express = require("express");
const router = express.Router();
const auth = require("../auth");

const userController = require('../controllers/user');

//Route for checking if the user's email already exists in the database
router.post('/checkemail', (req, res)=>{
	userController.checkEmailExists(req.body).then(result => res.send(result))
});

// Routes for User Registration with no email duplicates
router.post('/register', (req, res) => {
	userController.registerUser(req.body).then(result => res.send(result))
});

// Routes for authenticating a user
router.post('/login', (req, res) => {
	userController.loginUser(req.body).then(result => res.send(result))
});

// Routes for getting User details thru Bearer Token
router.get('/details', auth.verify, (req, res) => {
	const userData = auth.decode(req.headers.authorization);

	// Provides the user's ID for the getProfile controller method
	userController.getProfile({userId : userData.id}).then(resultFromController => res.send(resultFromController));
});






/* extra routes */


// Routes for making a User an Admin as per authenticated Admins' request
router.put('/:userId/set_as_admin', auth.verify, (req, res) => {

	const userData = auth.decode(req.headers.authorization);

	userController.setAsAdmin(req.params, {userId: userData.id, isAdmin: userData.isAdmin}).then(result => res.send(result))
});


// Routes for getting all Users
router.get('/all', (req, res) => {
	userController.getAllUser().then(result => res.send(result));
})



// Route to Create Order for Non-Admin User 
router.post('/checkout', auth.verify, (req, res) => {

	const userData = auth.decode(req.headers.authorization);

	let data = {
		userId: userData.id,
		productId: req.body.productId,
		quantity: req.body.quantity,
		price: userData.id
	}

	userController.createOrder(data, {userId: userData.id, isAdmin: userData.isAdmin}).then(result => res.send(result));
})



module.exports = router;