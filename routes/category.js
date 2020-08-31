const express=require('express');
const router=express.Router();
const{create,categorybyId,read}=require('../controllers/category')
const{userfindById}=require('../controllers/user')
const{requireSignin,isAuth,isAdmin}=require('../controllers/auth')
router.post('/category/create/:userId',requireSignin,isAuth,isAdmin,create);
router.get('/category/:categoryId/:userId',read)
router.param('categoryId',categorybyId)
router.param('userId',userfindById)
module.exports=router;