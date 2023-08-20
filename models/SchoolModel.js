const mongoose = require('mongoose');


const SchoolSchema = new mongoose.Schema({
   school_name:{type:String},
   school_level: {type:String},
   school_location: {type:String},
   school_teachers: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}]
}, {timestamps: true});

module.exports = mongoose.model('School', SchoolSchema);