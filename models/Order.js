const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({

	orders: [
		{
			productId: {
				type: String
			},
			productName: {
				type: String
			},
			userId: {
				type: String
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
				default: new Date
			}
		}		
	]
	
});


module.exports = mongoose.model('Order', orderSchema);