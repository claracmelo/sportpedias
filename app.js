const express = require('express');
const app = express();
const Sport = require('./models/sports.js');
const Contact = require('./models/contact.js');

const methodOverride = require('method-override');
const sportsController = require('./controllers/sportsController.js')


require('dotenv').config()
const PORT = process.env.PORT

// SETUP MONGOOSE
const mongoose = require('mongoose');
const mongoURI = process.env.MONGODB_URI

mongoose.connect(mongoURI);
mongoose.connection.once('open', () => {
	console.log(`Sportspedias connected to MongoDB π₯`);
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
  res.redirect("/sportpedias")
});


// LISTENER
const port = process.env.PORT || 4000
app.listen(port, ()=> {
    console.log("π€ΎπΌββοΈ running on port: ", port)
  })