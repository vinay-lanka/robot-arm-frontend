require('dotenv').config()
const express = require('express');
const mongoose = require("mongoose");
var bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const port = process.env.PORT || 3000;
const url = process.env.MONGODB_URI || 'mongodb://localhost/robot-userauth';
const app = express();


app.use(bodyParser.urlencoded({extended : true})); 
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

app.get('/', (req,res)=>{
    res.sendFile("/public/login.html", {'root': './'});
});

app.use(express.static(__dirname+'/public/'));

app.get('/dashboard',(req,res) => {
    if(req.cookies.auth){
        jwt.verify(req.cookies.auth.token, 'secret key',(err,verified)=>{
            if(err){
                res.json({err});
            }else{
                res.sendFile("/public/index.html", {'root': './'});
            }
        });
    }else{
        res.sendFile("/public/login.html", {'root': './'});
    }
});

mongoose.connect(url,{ useNewUrlParser: true }, (err) => {
    err ? console.log("Error connecting to database!") : console.log("Successfully connected to the database!");
});

app.use('/user', require('./Routes/user'));

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))