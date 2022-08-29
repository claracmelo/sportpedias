const mongoose = require("mongoose")

//CRETE SCHEMA SPORTS
const sportSchema = new mongoose.Schema({
    sport: {type:String},
    author: {type:String}, 
    about: String,
    rules: [{rule: {type:String}}], 
    facts: [{ 
            name: {type:String},
            fact: {type:String},
            img: {type:String}
           }],

        //    facts: [{
        //         type: mongoose.Schema.Types.ObjectId,
        //         ref: 'Fact',
        // }],
    comments:[{
            name: String,
            anonymous: Boolean, 
            comment: String
           }]
        });

//CREATE MODEL SPORTS
const Sport= mongoose.model("sport",sportSchema);

module.exports = Sport;







