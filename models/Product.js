const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({

	name: {
		type: String,
		required: [true, "Product name is required."]
	},
	description: {
		type: String,
		required: [true, "Product description is required."]
	},
	price: {
		type: Number,
		required: [true, "Product price is required."]
	},
	isActive: {
		type: Boolean,
		default: true
	},
	createdOn: {
		type: Date,
		default: new Date()
	},
	orders: [
		{
			userId: {
				type: String,
				required: [true, "UserId is required."]
			},
			quantity: {
				type: Number,
				default: 1
			},
			purchasedOn: {
				type: Date,
				default: new Date()
			}
		}
	]

});

module.exports = mongoose.model('Product', productSchema);