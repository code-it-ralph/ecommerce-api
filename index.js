const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Routes
const userRoutes = require('./routes/user');
const productRoutes = require('./routes/product');
const orderRoutes = require('./routes/order')


// Server SetUp
const app = express ();
const port = 4001;


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended : true }));


// Base Routes
app.use('/ecommerce/users', userRoutes, orderRoutes);
app.use('/ecommerce/products', productRoutes);




// MongoDB Connection
mongoose.connect("mongodb+srv://ralphdequina:ralphdequina@wdc028-course-booking.mwzyk.mongodb.net/capstone3_ecommerce_api?retryWrites=true&w=majority", {

	useNewUrlParser: true, 
	useUnifiedTopology: true

});

let db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error"));
db.once("open", () => console.log("Now connected to MongoDB Atlas."));



app.listen(process.env.PORT || port, () => console.log(`Now listening to port ${process.env.PORT || port}`));