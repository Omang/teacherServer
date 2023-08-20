const mongoose = require('mongoose');

const RepSchema = new mongoose.Schema({
    user_id:{type: mongoose.Schema.Types.ObjectId, ref: "User"},
    teacher_issue: {type:String},
    teacher_rating:{type:Number},
    describe_by: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
    when_date: {type:Date}

},{timestamps: true});


module.exports = mongoose.model('Rep', RepSchema);