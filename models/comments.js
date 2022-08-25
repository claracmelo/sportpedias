const mongoose = require("mongoose")

//CRETE SCHEMA COMMENTS
const commentSchema = new mongoose.Schema({
    name: {type:String, required:true},
    anonymous: Boolean, 
    message: {type:String, required:true}
});

//CREATE MODEL COMMENTS
const Comment= mongoose.model("comment",commentSchema);

module.exports = Comment;