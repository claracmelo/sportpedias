const mongoose = require("mongoose")

//CRETE SCHEMA SPORTS
const contactSchema = new mongoose.Schema({
    name: {type:String, required:true}, 
    email:{type:String, required:true},
    message: {type:String, required:true}
});

//CREATE MODEL SPORTS
const Contact= mongoose.model("contact",contactSchema);

module.exports = Contact;
