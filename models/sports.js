const mongoose = require("mongoose")




//CRETE SCHEMA SPORTS
const sportSchema = new mongoose.Schema({
    sport: {type:String, required:true},
    author: {type:String, required:true}, 
    about: String,
    rules: String, 
    facts: String, 
});

//CREATE MODEL SPORTS
const Sport= mongoose.model("sport",sportSchema);

module.exports = Sport;







