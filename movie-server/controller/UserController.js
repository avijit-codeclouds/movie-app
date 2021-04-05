const express=require('express');
const mongoose=require('mongoose');
const User=require ('../models/User');
const bcrypt=require ('bcrypt');
const jwt=require('jsonwebtoken');

exports.register_user=(req,res,next)=>{


    if (req.body.email=='' && req.body.name=='' || req.body.password==''){
        res.status(201).json({
            message:'All Fields are required'
        })
    }
    
    User.find({email:req.body.email}).then((user)=>{
        if(user.length>=1){
            res.status(201).json({
                message:'email already exists'
            })
        }
        var emailToValidate = req.body.email;
        var emailRegexp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
        var check=emailRegexp.test(emailToValidate);
        //  console.log(check);
         if(check===false){
             res.status(201).json({
                message:'Please provide valid email'
            })
         }

else{

    
    bcrypt.hash(req.body.password,10,(err,hash)=>{
        const user=new User({
            name:req.body.name,
            email:req.body.email,
            password:hash
        });

        user.save().then((user)=>{
            res.status(200).json({
                message:'Registered Successfully',
                user:user
            });
        }).catch((err)=>{
            console.log(err)
            res.status(500).json({message:"All Fields are required"});
        })
    })
}
})
}
