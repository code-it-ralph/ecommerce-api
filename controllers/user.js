const User = require('../models/User');
const Product = require('../models/Product');
const Order = require('../models/Order');
const bcrypt = require('bcrypt');
const auth = require('../auth');


module.exports.checkEmailExists = (reqBody) => {
	return User.find({ email: reqBody.email }).then(result => {
		if (result.length > 0) {
			return true;
		} else {
			//no duplicate email found
			return false;
		}
	})
}


// User Registration with no email duplicates
module.exports.registerUser = (reqBody) => {

	let newUser = new User({
		firstName: reqBody.firstName,
		lastName: reqBody.lastName,
		age: reqBody.age,
		gender: reqBody.gender,
		email: reqBody.email,
		password: bcrypt.hashSync(reqBody.password, 10),
		isAdmin: reqBody.isAdmin
	});

	return User.findOne({ email: newUser.email }).then(result => {
		if (result) {
			return false;
		}
		else {
			return newUser.save().then((user, error) => {
				if (error) {
					return false;
				}
				else {
					return true;
				}
			});
		}
	});
};


// User Authentication thru email verification
module.exports.loginUser = (reqBody) => {

	return User.findOne({ email: reqBody.email }).then(result => {

		if (result == null) {
			return false;
		}
		else {

			// to compare the non-encrypted PW to the encrypted PW from DB
			const isPasswordCorrect = bcrypt.compareSync(reqBody.password, result.password);

			if (isPasswordCorrect) {
				// showing access token as verification
				return { accessToken: auth.createAccessToken(result.toObject()) }
			}
			else {
				return false;
			}
		}
	});
};



// Updating a User as Admin as per authenticated Admins' request
module.exports.setAsAdmin = (reqParams, userData) => {

	return User.findById(userData.userId).then(result => {
		if (userData.isAdmin != true) {
			return false;
		}
		else {
			return User.findByIdAndUpdate(reqParams.userId, { isAdmin: true }).then((result, error) => {
				if (error) {
					return false;
				}
				else {

					return result.save().then((updatedRole, err) => {
						if (err) {
							return false;
						}
						else {
							return true;

						}
					})
				}
			})
		}
	})
};



// Getting all users
module.exports.getAllUser = () => {
	return User.find({}).then(result => {
		return result;
	})
}

// Getting a specific User
module.exports.getProfile = (data) => {
	return User.findById(data.userId).then(result => {
		result.password = "";
		return result;
	});
};

// Create Order for Non-Admin User
module.exports.createOrder = async (data, userData) => {

	// Getting the Product Price 
	let productPrice = await Product.findById(data.productId).then((product) => {
		return product.price;
	});

	// Getting the Product Name
	let productName = await Product.findById(data.productId).then((product) => {
		return product.name;
	});

	// Adding the Product ID to orders' Array on the USER MODEL
	let isUserUpdated = await User.findById(data.userId).then(user => {

		return User.findById(userData.userId).then(result => {
			if (userData.isAdmin == true) {
				return false;
			}
			else {

				// Adding the product to user's orders array
				user.orders.push({

					productId: data.productId,
					quantity: data.quantity,
					productName: productName,
					price: productPrice,
					totalAmount: productPrice * data.quantity

				})

				// Saving to DB
				return user.save().then((user, error) => {
					if (error) {
						return false;
					}
					else {
						return true;
					}
				})
			}
		})
	});

	// Adding the User ID to Orders's Array on the PRODUCT MODEL
	let isProductUpdated = await Product.findById(data.productId).then(product => {

		return User.findById(userData.userId).then(result => {
			if (userData.isAdmin == true) {
				return false;
			}
			else {

				// adding the User ID in the product's Orders array
				product.orders.push({ userId: data.userId, quantity: data.quantity })


				// Saves the updated product information in the DB
				return product.save().then((product, error) => {
					if (error) {
						return false;
					}
					else {
						return true;
					}
				})
			}
		});
	});



	// Adding the User ID and Products to Orders's Array on the ORDER MODEL
	let isOrderUpdated = await Order.findById(data.userId).then(order => {

		return Order.findById(userData.userId).then(result => {
			if (userData.isAdmin == true) {
				return false;
			}
			else {

				// adding the User ID in the Orders' Array
				let orderData = new Order()
				let productData = data.productId;
				let quantityData = data.quantity;

				orderData.orders.push({

					productId: productData,
					userId: userData.userId,
					productName: productName,
					quantity: quantityData,
					price: productPrice,
					totalAmount: quantityData * productPrice


				})

				return orderData.save().then((order, error) => {
					if (error) {
						return false;
					}
					else {
						return true;
					}
				})
			}
		});
	});





	if (isProductUpdated && isProductUpdated && isOrderUpdated) {
		return true;
	}
	else {
		return false;
	}

};



