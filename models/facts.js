const mongoose = require("mongoose")

//CRETE SCHEMA FACTS
const factSchema = new mongoose.Schema({
    _creator: { type: mongoose.Schema.Types.ObjectId, ref: 'Sport'},
    sportName:{ tpe:String},
    name: {type:String},
    fact: {type:String},
    img: String
});

//CREATE MODEL FACTS
const Fact= mongoose.model("fact",factSchema);

module.exports = Fact;
