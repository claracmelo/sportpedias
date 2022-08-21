const express = require('express');
const app = express();
const Sport = require('./models/sports.js');
const methodOverride = require('method-override');
const sportsController = require('./controllers/sportsController.js')

require('dotenv').config()
const PORT = process.env.PORT

// SETUP MONGOOSE
const mongoose = require('mongoose');
const mongoURI = process.env.MONGODB_URI

mongoose.connect(mongoURI);
mongoose.connection.once('open', () => {
	console.log(`Sportspedias connected to MongoDB 🥇`);
});

// MIDDLEWARE
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(methodOverride('_method'))


//MAIN ROUT
app.use('/sportpedias', sportsController)


// DEFAULT
app.get('/', (req, res) => {
	const today = new Date();
	res.send(`
    <p>Thanks for using our site</p>
    <p>Today: ${today}</p>
  `);
});


// LISTENER
const port = process.env.PORT || 3000
app.listen(port, ()=> {
    console.log("Products running on port: ", port)
  })