const express = require('express');
const mongoose= require('mongoose');
const morgan=require('morgan');
const bodyparser=require('body-parser')
const cookieparser=require('cookie-parser')
const cors=require('cors')
const expressvalidator = require('express-validator')
const authRouts=require('./routes/auth')
const userRouts=require('./routes/user')
const categoryRouts=require('./routes/category')
const productrouts=require('./routes/product')
require('dotenv').config()

const app= express();
mongoose.connect(process.env.DATABASE,{
    useNewUrlParser:true,
    useCreateIndex:true
}).then(()=>{
    console.log("database connected")
})

//morgan middelware
app.use(morgan('dev'));
app.use(bodyparser.json());
app.use(cookieparser())
app.use(expressvalidator());
//chors
app.use(cors());
//routes
app.use('/api',authRouts);
app.use('/api',userRouts);
app.use('/api',categoryRouts);
app.use('/api',productrouts);
const port=process.env.PORT||8000;
app.listen(port,(err)=>{
    if(err){
        console.log(err);
    }
    console.log("your app is served at:",port);
})