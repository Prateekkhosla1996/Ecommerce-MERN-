const Product=require('../models/product')
const {errorHandler}=require('../helpers/dbErrorhandler')
const formidable=require('formidable');
const fs=require('fs')
const lodash =require('lodash');

exports.create=(req,res)=>{
   const form = new formidable.IncomingForm();
   form.keepExtensions=true
   form.parse(req,(err,fields,files)=>{
       if(err){
           return res.status(400).json({
               error:"image could not be uploaded"
           })
       }
       //check for all fields
       const{name,description,price,category,quantity,shipping}=fields
       if(!name||!description||!price||!category||!quantity||!shipping){
           return res.status(400).json({
               error:"all fields are required"
           })
       }
       const product= new Product(fields);
       if(files.photo){
           console.log(files.photo)
           if(files.photo.size>2000000){
               return res.status(400).json({
                   error:'sile size should be of maximium 2mb'
               })
           }
           product.photo.data = fs.readFileSync(files.photo.path)
           product.photo.contentType=files.photo.type
       }
       product.save((err,data)=>{
        if(err){
            return res.status(400).json({
                error:errorHandler(err)
            })
        }
        res.json(data)
    })
   })
}

exports.productfindById=(req,res,next,id)=>{
    Product.findById(id).exec((err,product)=>{
        if(err||!product){
            return res.status(400).json({
                error:"product dosent exist"
                })
        }
        req.product=product
        next();
    })
}
exports.read=(req,res)=>{
    req.product.photo=undefined
    return res.json(req.product)
}