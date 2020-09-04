const express=require('express');
const router=express.Router();
const{create,productfindById,read,remove,update,list,listRelated,listCategories,listBySearch,photo}=require('../controllers/product')
const{userfindById}=require('../controllers/user')
const{requireSignin,isAuth,isAdmin}=require('../controllers/auth');
// const { remove } = require('../models/user');
router.get('/product/:productId',read)
router.post('/product/create/:userId',requireSignin,isAuth,isAdmin,create);
router.delete('/product/:productId/:userId',requireSignin,isAuth,isAdmin,remove)
router.put('/product/:productId/:userId',requireSignin,isAuth,isAdmin,update)
router.get('/products',list);
router.get('/products/related/:productId', listRelated)
router.get('/products/categories',listCategories)
router.post("/products/by/search", listBySearch);
router.get("/product/photo/:productId",photo)
router.param('userId',userfindById)
router.param('productId',productfindById)//product by id
module.exports=router;