const User = require('../models/UserModel')
const License = require('../models/LicenseModel');
const Comm = require('../models/ComModel.js');
const Payment = require('../models/PaymentModel');
const Message = require('../models/ComModel');


const allLicense = async(req, res)=>{
    const {id} = req.params;
    
    try{
      const checkuser = await User.findById(id);
      if(checkuser){

        const getall = await License.find();

        res.json(getall);

      }else{
        throw new Error('You are not an app user');
      }
    }catch(e){
        throw new Error(e);
    }
}
const NewApp = async(req, res)=>{
    const {user_id, license_type, license_amount, license_duration, license_subject} = req.body;

    try{

        const newapp = await License.create({
            user_id: user_id,
            license_type: license_type,
            license_amount: license_amount,
            license_duration: license_duration,
            license_subject: license_subject
        });

        res.json({message: 'make payment'});
        


    }catch(e){
        throw new Error(e);
    }

}
const AppPay = async(req, res)=>{
    const {user_id} = req.body;
    try{

     const FindLicense = await License.findOne({user_id: user_id});
     if(FindLicense){

        const updatepayment = await License.findByIdAndUpdate(FindLicense._id, {
            app_payment: true
        }, {new: true});

        if(updatepayment){

            const sendsms = await Comm.create({
                message_type: 'Application submitted',
                themessage: 'Your have submitted an application. Waiting approval.'
            });
              if(sendsms){
                    await User.findByIdAndUpdate(user_id, {
                    $push:{message: sendsms._id.toString()}
                }, {new:true});

                res.json(updatepayment);

              }
          
        }
        

     }else{
        throw new Error({error: 'License not found'});
     }

    }catch(e){
        throw new Error(e);
    }
}

const LicensePay = async(req, res)=>{

    const {user_id} = req.body;
    try{

     const FindLicense = await License.findOne({user_id: user_id});
     if(FindLicense){

        const updatepayment = await License.findByIdAndUpdate(FindLicense._id, {
            license_payment: true,
        }, {new: true});

        if(updatepayment){
            const finduser = await User.findByIdAndUpdate(user_id, {
                $push:{teacher_license: updatepayment._id.toString()}
            },{new: true});
            if(updatepayment){
             const sendsms = await Comm.create({message_type: 'License Ready',
             themessage: 'Your License is ready for collection'});
             if(sendsms){
                await User.findByIdAndUpdate(user_id,{
                    $push:{message:sendsms._id.toString()}
                },{new:true});
                res.json(updatepayment);
             }
            }

            
        }

        

     }else{
        throw new Error({error: 'License not found'});
     }

    }catch(e){
        throw new Error(e);
    }

}
const RenewApp = async(req, res)=>{
   
}
const userApp = async(req, res)=>{
  
    const {id} = req.params;

    try{

        const viewapp = await License.findOne({user_id: id});

        res.json(viewapp);

    }catch(e){
        throw new Error(e);
    }

}
const adminApp = async(req, res)=>{
  
    const {id} = req.params;
    

    try{

        const viewapp = await License.findById(id).populate('user_id');

        res.json(viewapp);
        

    }catch(e){
        throw new Error(e);
    }

}
const viewApp = async(req, res)=>{
  
    const {id} = req.params;
    console.log(id);

    try{

        const viewapp = await License.findOne({user_id:id}).populate('user_id');

        res.json(viewapp);
        console.log(viewapp)

    }catch(e){
        throw new Error(e);
    }

}
const approveapp = async(req, res)=>{
    const {user_id} = req.body;
    try{
     
        const approve = await License.findOneAndUpdate({user_id: user_id},{
            license_approve: true
        }, {new: true});
        if(approve){
            const sendsms = await Comm.create({message_type: 'License Approved', 
            themessage: 'Your License have been approved. Make Payment'});
            if(sendsms){
                await User.findByIdAndUpdate(user_id, {
                    $push:{message: sendsms._id.toString()}
                },{new:true});

                res.json({message:'Successful approved.'});
            }
        }

    }catch(e){
        throw new Error(e);
    }
}

const CorrectApp = async(req, res)=>{
    const {user_id, themessage} = req.body;
    try{

        const sendsms = await Comm.create({
            message_type: 'Correction needed',
            themessage: themessage
        });
        if(sendsms){
            await User.findByIdAndUpdate(user_id, {
                $push:{message: sendsms._id.toString()}
            }, {new:true});
            res.json({message: 'successful sent'});
        }

    }catch(e){
        throw new Error(e);
    }
}
const GetuserSms = async(req, res)=>{
    const {user_id} = req.body;
    try{

        const allsms = await User.findById(user_id).populate('message');
        res.json(allsms);

    }catch(e){
        throw new Error(e);
    }
}
const getsms = async(req, res)=>{
    const {id} = req.params;
    try{
        const theone = await Comm.findById(id);

        res.json(theone);
    }catch(e){
        throw new Error(e);
    }
}
const pendingdocs = async(req, res)=>{
    try{

        const getpending = await License.find({
            $and: [{app_payment: true}, {license_payment: false}]
        }).populate('user_id');

        res.json(getpending);


    }catch(e){
        throw new Error(e);
    }
}

const approveddocs = async(req, res)=>{
    try{

        const getpending = await License.find({
            $and: [{app_payment: true}, {license_approve: true}]
        }).populate('user_id');

        res.json(getpending);


    }catch(e){
        throw new Error(e);
    }
}



module.exports = {NewApp, RenewApp, viewApp, CorrectApp, getsms, GetuserSms,
 approveapp, userApp, LicensePay, AppPay, allLicense, pendingdocs, approveddocs, adminApp};