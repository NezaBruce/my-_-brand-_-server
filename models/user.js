import mongoose from "mongoose"
import Joi from 'joi';
const userModel=new mongoose.Schema({
    first_name:{type:String,default:null},
    last_name:{type:String,default:null},
    email:{type:String,unique:true,required:true},
    password:{type:String},
    token:{type:String},
    isadmin:{type:Boolean,default:false},
    verificationCode: {
      type: Number,
    },
   isEmailVerified: {
      type: Boolean,
      default: false,
    },
})
const User=mongoose.model("user",userModel);

const validateUser=(prop)=>
{
  try{
  const JoiSchema = Joi.object().keys ({      
    first_name: Joi.string().min(3).max(10).required(),               
    last_name: Joi.string().min(3).max(10).required(),               
    email: Joi.string().email().min(5).max(50).required(),
    password: Joi.string().min(4).alphanum().required()
          });      
          return JoiSchema.validate(prop);
}catch(err){
  // res.send(err);
  console.log(err)
}

}
// module.exports.validateUser=validateUser;
export default User;
export {validateUser};