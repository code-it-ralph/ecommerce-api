const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({

	firstName: {
		type: String,
		required: [true, "First Name is required."]
	},
	lastName: {
		type: String,
		required: [true, "Last Name is required."]
	},
	age: {
		type: String,
		required: [true, "Age is required."]
	},
	gender: {
		type: String,
		required: [true, "Gender is required."]
	},
	email: {
		type: String,
		required: [true, "Email is required."]
	},
	password: {
		type: String,
		required: [true, "Password is required."]
	},
	isAdmin: {
		type: Boolean,
		default: false
	},
	
	orders: [{

		productId: {
			type: String,
			required: [true, "Product ID is required."]
		},
		productName: {
			type: String,
		},
		quantity: {
			type: Number,
			default: 1
		},
		price: {
			type: Number
		},
		totalAmount: {
			type: Number
		},
		purchasedOn: {
			type: Date,
			default: new Date()
		}
	}]

})


module.exports = mongoose.model('User', userSchema);