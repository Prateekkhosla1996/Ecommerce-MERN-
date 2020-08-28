const express=require('express');
const router=express.Router();
const{userfindById}=require('../controllers/user')
const{requireSignin,isAuth,isAdmin}=require('../controllers/auth')
router.get('/secret/:userId',requireSignin,isAuth,isAdmin,(req,res)=>{
    res.json({
        user:req.profile
    })
})
router.param('userId',userfindById)
module.exports=router;