
//validar-jwt.js
const jwt = require('jsonwebtoken');
const { request ,response} = require('express');
require('dotenv').config();

const validarJWT =(req=request,res=response,next)=>{
    const token=req.header('x-token');

    if(!token){
        return res.status(401).json({
            msg:'No hay token en la peticion'
        });
    }

    try{
        const payload =jwt.verify(token,process.env.SECRETORPRIVATEKEY);
        const {uid} =jwt.verify(token,process.env.SECRETORPRIVATEKEY);
        req.uid=uid

        console.log('payload', payload)
        next();
    }
    catch(err){
        console.log(err);
        res.status(401).json({
            msg:'Token no valido'
        })
    }

    

}

module.exports=validarJWT;