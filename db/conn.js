const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({path:'../config.env'});
let DATABASE_URL = process.env.DATABASE

mongoose.connect(DATABASE_URL,{autoIndex:true}).then(()=>{
    console.log(`Mongoose connection successfully`)
}).catch((error)=>{
    console.log(`Mongoose connection fail`)
});