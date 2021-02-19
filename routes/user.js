const express=require('express');
const router=express.Router();
const userModel=require('../models').User;
const {Op}=require('sequelize');
const bcrypt=require('bcrypt');
const jwtConfig = require('../config/jwt-config');


//createing a user in the databese api
router.post('/user',(req,res)=>{
    const{firstName,lastName,email}=req.body;

    userModel.findOne({
        where:{
            email:{
                [Op.eq]:email
            }
        }
    })
    .then(user=>{
        if(user){
            //user alresdy exist with the email address
            res.status(500).json({
                status:0,
                message:"User with the email address alredy exist"
            })
        }else{
            //lets create a user
            userModel.create({
                firstName:firstName,
                lastName:lastName,
                email:email,
                password:bcrypt.hashSync(req.body.password,10)
            })
            .then(()=>{
                res.status(200).json({
                    status:1,
                    message:"User created suceesfully"
                })
            })
            .catch(err=>{
                res.status(500).json({
                    status:0,
                    message:"Unable to create a user",
                    data:err
                })
            })
        }
    })
    .catch(err=>{
        console.log(err);
    })
    
})

//login  api
router.post('/login',(req,res)=>{ 

    const {email,password}=req.body;
    User.findOne({
        where:{
            email:email
        }
    })
    .then(user=>{
        if(user){
            //we have user data
            if(bcrypt.compareSync(password,user.password)){
                
                let userToken=JWT.sign({ 
                    email:user.email,
                    id:user.id
                },JwtConfig.secret,{
                    expiresIn:JwtConfig.expiresIn, //this will be in ms,here 10 minute
                    notBefore:JwtConfig.notBefore, //after 1 minute we are able to use that
                    audience:JwtConfig.audience,
                    issuer:JwtConfig.issuer,
                    algorithm:JwtConfig.algorithm
                });

                //password matched
                res.status(200).json({
                    status:1,
                    message:"User logged in sucessfully",
                    token:userToken
                })
            }else{
                //password didn't matched
                res.status(500).json({
                    status:0,
                    message:"Password didn't match"
                })
            }
        }else{
            //we don't have user data
            res.status(500).json({
                status:0,
                message:"No such user Exist"
            })
        }
    })
    .catch(err=>{
        console.log(err);
    })
})

module.exports=router;
