const Product = require('../models/Product');
const User = require('../models/User');
const Order = require('../models/Order')
const auth = require('../auth');


// Adding a Product
module.exports.addProduct = (reqBody, userData) => {

	return Product.findById(userData.userId).then(result => {
		if (userData.isAdmin != true) {
			return false;
		}
		else {

			let newProduct = new Product({
				name: reqBody.name,
				description: reqBody.description,
				price: reqBody.price
			})

			return newProduct.save().then((product, err) => {
				if (err) {
					return false;
				}
				else {
					return true;

				}
			})

			
		}
	})
};


// Retrieve all Active Products
module.exports.getAllActive = () => {
	return Product.find({ isActive: true }).then(result => {
		return result;
	})
};

// Retrieve all Products
module.exports.getAllProducts = () => {
	return Product.find({}).then(result => {
		return result;
	})
};


// Retrieve Specific Product
module.exports.getProduct = (reqParams) => {
	return Product.findById(reqParams.productId).then(result => {
		return result;
	})
};


// Updating a Product Information
module.exports.updateProduct = (reqParams, reqBody, userData) => {

	return Product.findById(reqBody.userId).then(result => {
		if (userData.isAdmin != true) {
			return false;
		}
		else {
			let udpatedProduct = {
				name: reqBody.name,
				description: reqBody.description,
				price: reqBody.price,
				isAdmin: reqBody.isAdmin
			}

			return Product.findByIdAndUpdate(reqParams.productId, udpatedProduct)
			.then((product, error) => {
				if (error) {
					return false;
				}
				else {
					return true;
				}
			})
		}
	})
};



// Archiving a Product
module.exports.archiveProduct = (reqParams, userData) => {

	return User.findById(userData.userId).then(result => {
		if (userData.isAdmin != true) {
			return false;
		}
		else {
			return Product.findByIdAndUpdate(reqParams.productId, { isActive: false }).then((result, error) => {
				if (error) {
					return false;
				}
				else {

					return result.save().then((archivedPoduct, err) => {
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


// Unarchiving a Product
module.exports.unarchiveProduct = (reqParams, userData) => {

	return User.findById(userData.userId).then(result => {
		if (userData.isAdmin != true) {
			return false;
		}
		else {
			return Product.findByIdAndUpdate(reqParams.productId, { isActive: true }).then((result, error) => {
				if (error) {
					return false;
				}
				else {

					return result.save().then((archivedPoduct, err) => {
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