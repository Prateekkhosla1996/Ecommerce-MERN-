const express=require('express');
const router=express.Router();
const{create,productfindById,read,remove}=require('../controllers/product')
const{userfindById}=require('../controllers/user')
const{requireSignin,isAuth,isAdmin}=require('../controllers/auth');
// const { remove } = require('../models/user');
router.get('/product/:productId',read)
router.post('/product/create/:userId',requireSignin,isAuth,isAdmin,create);
router.delete('/product/:productId/:userId',requireSignin,isAuth,isAdmin,remove)
router.param('userId',userfindById)
router.param('productId',productfindById)
module.exports=router;