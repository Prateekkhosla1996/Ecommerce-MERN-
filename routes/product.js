const express=require('express');
const router=express.Router();
const{create}=require('../controllers/product')
const{userfindById}=require('../controllers/user')
const{requireSignin,isAuth,isAdmin}=require('../controllers/auth')
router.post('/product/create/:userId',requireSignin,isAuth,isAdmin,create);

router.param('userId',userfindById)
module.exports=router;