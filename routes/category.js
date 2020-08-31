const express=require('express');
const router=express.Router();
const{create,categorybyId,read,update,del,list}=require('../controllers/category')
const{userfindById}=require('../controllers/user')
const{requireSignin,isAuth,isAdmin}=require('../controllers/auth')
router.post('/category/create/:userId',requireSignin,isAuth,isAdmin,create);
router.put('/category/:categoryId/:userId',requireSignin,isAuth,isAdmin,update);
router.delete('/category/:categoryId/:userId',requireSignin,isAuth,isAdmin,del);
router.get("/categories",list)
router.get('/category/:categoryId/:userId',read)
router.param('categoryId',categorybyId)
router.param('userId',userfindById)
module.exports=router;