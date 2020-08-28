let uuidv1 = require('uuidv1')
console.log(uuidv1())
const jwt=require('jsonwebtoken');// to generate sign token
const expressJwt=require('express-jwt')// auth check
const User=require('../models/user')
const {errorHandler}=require('../helpers/dbErrorhandler')
exports.signup=(req,res)=>{
    console.log('req.body',req.body)
   const user=new User(req.body);
   user.save((err,user)=>{
    if(err){
        return res.status(400).json({
            err:errorHandler(err)
        
        })
    }
    user.salt=undefined
    user.hashed_password=undefined
    res.json({
        user
    })
   })
}
exports.signin=(req,res)=>{
    //find the user based on email
    const {email,password}=req.body
    User.findOne({email},(err,user)=>{
        if(err||!user){
            return res.status(400).json({
                err:'user does not exist'
            })
        }
        //maching password and email
        //creat auth 
        if(!user.authenticate(password)){
            return res.status(401).json({
                error:'email and password do not match'
            })
        }
        //generate a token with user id
        const token= jwt.sign({_id:user._id},process.env.JWT_SECRET)
        //persist the token as 't' in cookie
        res.cookie('t',{expire:new Date()+9999})
        //return resonse with user and token to frontend client
        const{_id,name,email,role}=user
        return res.json({token,user:{_id,name,email,role}});
    })

}
exports.signout=(req,res)=>{
    res.clearCookie('t')
    res.json({message:"signout sucess"})
}
// exports.requireSignin = expressJwt({
//     secret: process.env.JWT_SECRET,
//     // algorithms: ["HS256"], // added later
//     userProperty: "auth",
//   });
exports.requireSignin=expressJwt({
    secret:'process.env.JWT_SECRET',
    algorithms: ["HS256"],
    userProperty:"auth"
});