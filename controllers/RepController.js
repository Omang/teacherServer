const User = require('../models/UserModel');
const Rep = require('../models/RepModel');
const School = require('../models/SchoolModel');


const Addrep = async(req, res)=>{
    const {user_id, describe_by, teacher_rating, teacher_issue} = req.body;
    try{

        const addrep = await Rep.create({
            user_id: user_id,
            teacher_issue: teacher_issue,
            describe_by: describe_by,
            teacher_rating: teacher_rating
        });
        res.json(addrep);

    }catch(e){
        throw new Error(e);
    }

}
const UserReps = async(req, res)=>{
   const {user_id} = req.body;
   try{

    const allreps = await Rep.find({user_id: user_id});

    res.json(allreps);

   }catch(e){
    throw new Error(e);
   }

}
const ViewRep = async(req, res)=>{

    const {id} = req.params;

    try{
      
        const rep = await Rep.findById(id);

        res.json(rep);

    }catch(e){
        throw new Error(e);
    }

}
const DeleteRep = async(req, res)=>{
  
}
const addschool = async(req, res)=>{
    const {user_id, school_name, school_level, school_location} = req.body;
    try{

        const checkuser = await User.findById(user_id);
        if(checkuser){

            const addone = await School.create({
               school_name: school_name, school_level:school_level, school_location: school_location
            })
          res.json(addone);
 
        }else{

            throw new Error('user dont exists');

        }

    }catch(e){
        throw new Error(e);
    }
}

const addteacher = async(req, res)=>{
    console.log(req.body);
    const {id, firstname, lastname, email} = req.body;
    try{
        const findmail = await User.findOne({email: email});
        if(findmail){
               res.json({message: true});
        }else{
            const createTeacher = await User.create({
            firstname: firstname,
            lastname: lastname,
            password: '12345',
            email: email
        });
        if(createTeacher){
            const addone = await School.findByIdAndUpdate(id,{
            $push:{school_teachers: createTeacher._id.toString()}
        },{new:true});
         console.log(createTeacher);
        res.json(createTeacher);
        }

        }
    }catch(e){
        throw new Error(e)
    }
}

const schoolteachers = async(req, res)=>{
    const {id} = req.params;
    try{

        const getTeachers = await School.findById(id).populate('school_teachers');

        res.json(getTeachers.school_teachers);

    }catch(e){
        throw new Error(e);
    }
}

const allschools = async(req, res)=>{
    try{

        const allschool = await School.find();

        res.json(allschool);

    }catch(e){
        throw new Error(e);
    }
}

const getSchool = async(req, res)=>{
    const {id} = req.params;
    try{

        const getTeachers = await School.findById(id);

        res.json(getTeachers);

    }catch(e){
        throw new Error(e);
    }
}


module.exports ={Addrep, UserReps, ViewRep, DeleteRep, addschool, addteacher, allschools, schoolteachers, getSchool};