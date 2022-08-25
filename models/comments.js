const mongoose = require("mongoose")

//CRETE SCHEMA COMMENTS
const commentSchema = new mongoose.Schema({
    name: String,
    anonymous: Boolean, 
    comment: String
});

//CREATE MODEL COMMENTS
const Comment= mongoose.model("comment",commentSchema);

module.exports = Comment;