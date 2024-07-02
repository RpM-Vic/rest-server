
//validar-jbt
const jwt = require('jsonwebtoken');
const { request ,response} = require('express');

const validarJWT =(req=request,res=response,next)=>{
    const token=req.header('x-token');

    if(!token){
        return res.status(401).json({
            msg:'No hay token en la peticion'
        });
    }

    try{
        jwt.verify(token,process.env.SECRETORPRIVATEKEY);

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