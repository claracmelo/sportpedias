const mongoose = require("mongoose")

//CRETE SCHEMA FACTS
const factSchema = new mongoose.Schema({
    name: {type:String, required:true},
    fact: {type:String, required:true},
    img: String
});

//CREATE MODEL FACTS
const Fact= mongoose.model("fact",factSchema);

module.exports = Fact;
