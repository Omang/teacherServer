const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
   firstname :{type: String},
   lastname: {type: String},
   role:{type:String},
   refreshToken:{type:String},
   gender: {type:String},
   password: {type:String},
   email: {type:String},
   mobilenumber: {type:String},
   DOB: {type:String},
   POB: {type:String},
   certificates:[String],
   experience:{type:String},
   enhanced_materials: [String],
   teacher_license: [{type: mongoose.Schema.Types.ObjectId, ref: "License"}],
   teacher_active:{type:Boolean, default: false},
   message:[{type: mongoose.Schema.Types.ObjectId, ref: "Comm"}],
   payment_made: {type: mongoose.Schema.Types.ObjectId, ref: "Payment"}
}, {timestamps: true});
UserSchema.pre('save', async function(next){
   if(!this.isModified("password")){
       next();
   }
   const salt = await bcrypt.genSaltSync(10);
   this.password = await bcrypt.hash(this.password, salt);
   next();
});
UserSchema.methods.isPasswordMatched = async function(enteredPassword){
   return await bcrypt.compare(enteredPassword, this.password);
}

module.exports = mongoose.model('User', UserSchema);