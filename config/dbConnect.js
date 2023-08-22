const {default: mongoose} = require('mongoose');

const dbConnect = ()=>{
    try {
        const conn = mongoose.connect("mongodb+srv://ramoswaane:omang214919117@cluster0.em7y4qz.mongodb.net/teacherdb?retryWrites=true&w=majority");
       console.log('database connected successfull'); 
    } catch (err) {
      console.log('database error');
    }
}

module.exports = dbConnect;