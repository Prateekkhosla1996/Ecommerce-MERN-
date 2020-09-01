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

exports.remove=(req,res)=>{
    let product =req.product
    product.remove((err,deletedproduct)=>{
        if(err){
            res.json({
                error:errorHandler(err)
            })
        }
        res.json({
            message:"product is deleted"
        });
    })
}

exports.update=(req,res)=>{
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
        let product= req.product
        product=lodash.extend(product,fields)
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
 
 //sell and arrival 
 //by sell = /products?sortBy=sold&order=desc&limit=4
 //by arrival = /products?sortBy=createdAt&order=desc&limit=4
 //if no params are sent then all products are returned

exports.list=(req,res)=>{
    // return res.json(req.products)
    let order=req.query.order ? req.query.order : 'asc';
    let sortby=req.query.sortBy ? req.query.sortBy : '_id';
    let limit=req.query.limit ? parseInt(req.query.limit) : 6;

    Product.find()
    .select("-photo")
    .populate('category')
    .sort([[sortby,order]])
    .limit(limit)
    .exec((err,data)=>{
        if(err){
            return res.status(400).json({
                error:'product not found'
            })
        }
        res.json(data);
    })

}

/**
 * it will find the products based on request product category
 * other products that has the same category, will be returned
 */

exports.listRelated= (req,res)=>{
    let limit=req.query.limit ? parseInt(req.query.limit) : 6;
    Product.find({_id: {$ne:req.product},category:req.product.category})
    .limit(limit)
    .populate('category','_id name')
    .exec((err,data)=>{
        if(err){
            return res.status(400).json({
                error:"Product not found"
            })
        }
        res.json(data);
    })
}