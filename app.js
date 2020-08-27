const express = require('express');
const mongoose= require('mongoose');
const morgan=require('morgan');
const bodyparser=require('body-parser')
const cookieparser=require('cookie-parser')
const userRouts=require('./routes/user')
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
//routes
app.use('/api',userRouts);
const port=process.env.PORT||8000;
app.listen(port,(err)=>{
    if(err){
        console.log(err);
    }
    console.log("your app is served at:",port);
})