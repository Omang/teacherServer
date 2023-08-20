const mongoose = require('mongoose');

const LicenseSchema = new mongoose.Schema({
   user_id: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
   license_type: {type:String},
   license_amount: {type:String},
   license_duration: {type:String},
   license_date: {type:Date},
   license_status: {type:String},
   license_subject: {type: String},
   app_payment: {type: Boolean, default: false},
   license_payment: {type: Boolean, default: false},
   license_approve: {type: Boolean, default: false}
}, {timestamps: true});

module.exports = mongoose.model('License', LicenseSchema);