const Order = require('../models/Order')
const Product = require('../models/Product');
const User = require('../models/User');
const auth = require('../auth');

// Getting All Orders
module.exports.getAllOrders = (userData) => {

	return User.findById(userData.userId).then(result => {
		if (userData.isAdmin != true) {
			return false;
		}
		else {
			return Order.find(userData.orders).then((result1, error) => {
				if (error) {
					return false;
				}
				else {
					return result1;
				}
			})
		}
	})
};


// Retrieving authenticated user’s orders
module.exports.myOrder = (data, userData) => {

	return User.findById(userData.userId).then(result => {
		if (userData.isAdmin == true) {
			return false;
		}
		else {

			return result;
		}
	})
};
