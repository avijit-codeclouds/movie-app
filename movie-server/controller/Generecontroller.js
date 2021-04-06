const express = require('express');
const mongoose = require('mongoose');
const Genere = require('../models/Genere');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.create_genere=(req,res,next)=>{
    if(req.body.name==='' ||  req.body.details===''){
        res.status(201).json({
            message: 'All Fields are required',
            success: false
        })
    }
    else{
        try{
        var genere = new Genere({
            name: req.body.name,
            details: req.body.details,
        });
        genere.save().then((genere) => {
            res.status(200).json({
                message: 'Genere Added Successfully',
                genere: genere,
                success: true
            });
        }).catch((err) => {
            console.log(err)
            res.status(500).json({ message: "name and details field is required", success: false });
        })
}
    
    catch(e){
        res.status(500).json({ message: "something went wrong ", success: false });
    }
    }
}