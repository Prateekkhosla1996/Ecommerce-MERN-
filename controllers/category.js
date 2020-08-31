const Category=require('../models/category')
const {errorHandler}=require('../helpers/dbErrorhandler');
const category = require('../models/category');
exports.create=(req,res)=>{
    const category=new Category(req.body);
    category.save((err,data)=>{
        if(err){
            return res.status(400).json({
                error:errorHandler(err)
            })
        }
        res.json({data});
    })
}
exports.categorybyId=(req,res,next,id)=>{
    Category.findById(id).exec((err,category)=>{
        if(err||!category){
            return res.status(400).json({
                error:"category not existed"
            })
        }
        req.category=category;
        next();
    })
}
exports.read=(req,res)=>{
    return res.json(req.category)
}