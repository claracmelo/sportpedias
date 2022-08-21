const mongoose = require("mongoose")

//CRETE SCHEMA SPORTS
const sportSchema = new mongoose.Schema({
    sport: {type:String, required:true},
    author: {type:String, required:true}, 
    history: {type:String, required:true},
    rules: {type:String, required:true}, 
    facts: {type:String, required:true}, 
});

//CREATE MODEL SPORTS
const Sport= mongoose.model("sport",sportSchema);

module.exports = Sport;

//CRETE SCHEMA FACTS
const factSchema = new mongoose.Schema({
    name: {type:String, required:true},
    fact: {type:String, required:true},
    img: {type:String}
});

//CREATE MODEL FACTS
const Fact= mongoose.model("fact",factSchema);

module.exports = Fact;

//CRETE SCHEMA COMMENTS
const commentSchema = new mongoose.Schema({
    name: {type:String, required:true},
    anonymous: Boolean, 
    message: {type:String, required:true}
});

//CREATE MODEL COMMENTS
const Comment= mongoose.model("comment",commentSchema);

module.exports = Comment;




