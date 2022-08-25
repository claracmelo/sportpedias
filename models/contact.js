const mongoose = require("mongoose")

//CRETE SCHEMA SPORTS
const contactSchema = new mongoose.Schema({
    name: {type:String}, 
    email:{type:String},
    message: {type:String}
});

//CREATE MODEL SPORTS
const Contact= mongoose.model("contact",contactSchema);

module.exports = Contact;
