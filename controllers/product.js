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
       const product= new Product(fields);
       if(files.photo){
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