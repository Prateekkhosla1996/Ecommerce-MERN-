const express=require('express');
const router=express.Router();
const{create,productfindById,read}=require('../controllers/product')
const{userfindById}=require('../controllers/user')
const{requireSignin,isAuth,isAdmin}=require('../controllers/auth')
router.get('/product/:productId',read)
router.post('/product/create/:userId',requireSignin,isAuth,isAdmin,create);

router.param('userId',userfindById)
router.param('productId',productfindById)
module.exports=router;