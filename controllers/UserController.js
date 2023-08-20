const User = require('../models/UserModel');
const {generateRefreshToken} = require('../config/refreshToken');



const registeruser =async(req, res)=>{
    const {email, password} = req.body;
    try{

        const newUser = await User.create({email:email, password: password});

        res.json({message: 'User created'});

    }catch(e){
        throw new Error(e);
    }
    
}
const updateprofile = async(req, res)=>{
  const {user_id,
         firstname,
        lastname,
        role,
        gender,
        mobilenumber,
        DOB,
        POB,
        certificates,
        experience,
        } = req.body;
  try{
    const profileadd = await User.findByIdAndUpdate(user_id,{
        firstname: firstname,
        lastname: lastname,
        role: role,
        gender: gender,
        mobilenumber: mobilenumber,
        DOB: DOB,
        POB: POB,
        education:{
          $push:{certificates: certificates},
          experience: experience
        }
    },{new:true});

    res.json(profileadd);

  }catch(e){
    throw new Error(e);
  }
}

const loginuser =async(req, res)=>{
    const {email, password} = req.body;
    console.log(req.body);
    
        try {
            const findone = await User.findOne({email:email});
            if(findone && await findone.isPasswordMatched(password))
        {
          const refreshtoken = await generateRefreshToken(findone?._id);
          const updateuser = await User.findByIdAndUpdate(
            findone._id,{
            refreshToken: refreshtoken
          },{
            new: true
          });
          res.json({
            _id: findone?._id,
            firstname: findone?.firstname,
            lastname: findone?.lastname,
            email: findone?.email,
            mobilenumber: findone?.mobile,
            role: findone?.role,
            refreshToken: generateToken(findone?._id)
          });     
    
        }else{
            throw new Error("Invalid Credentials");
        }
        } catch (error) {
            throw new Error(error);
        }
}
const logout =async(req, res)=>{

    const {refreshToken} = req.body;
    //console.log(req.cookies);
    if(!refreshToken) throw new Error("No refresh Token in cookies");
    
    const user = await User.findOne({refreshToken: refreshToken}); 
    if(!user){
      
      return res.status(204) //forbidden
    }else{
      await User.findOneAndUpdate(refreshToken, {
      refreshToken: ""
    });
   
     res.status(204).json({logout: "logged out"}); //forbidden
    }  

}

module.exports = {registeruser, loginuser, logout, updateprofile};