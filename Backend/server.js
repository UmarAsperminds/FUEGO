var express = require("express");
var mongoose = require("mongoose");
var bodyParser= require('body-parser');
var cors = require('cors');
const fileUpload = require('express-fileupload');
var port = 5000;
const Cryptr = require('cryptr');
const cryptr = new Cryptr('@FUEGO#1999');
console.log(cryptr.decrypt('7b197dd3a12037a5fb6dc2073bf928cbfe454ea0f3ecfaa887854844dccbe89349ef79f66cf4d38b865f98da607c9ef1c6dc92e1d756f6e759bdef3280e45d8e6fe025d446d687b5df8c2269f3f95d51a5fd7c90ca6ed66d4a6e6d765f0dbb01bb7618'))
var app= express();
mongoose.connect('mongodb://umar:Q!w2e3r4@localhost:27017/FUEGO?authSource=admin&maxPoolSize=200&minPoolSize=100').then(()=>{
    console.log("connection successful")

}).catch((err)=>{
    console.log(err)
})

app.use(cors())
app.use(bodyParser.urlencoded({limit: '50mb', extended: true }));
app.use(bodyParser.json({limit: '50mb'}));
app.use(fileUpload());

// app.listen(port);
var routes=require('./routes');
app.use('/api',routes);
app.listen(port, function() {
    console.log('Listening to port:  ' + port);
});
app.get("/",function(req,res){
    return res.send("mongo developer")
})
console.log("app is listening to:",port)        