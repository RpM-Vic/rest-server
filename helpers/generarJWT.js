
//generarJWT.js
const jwt = require('jsonwebtoken');
require('dotenv').config();

const Usuario = require('../models/oneUser');

const generarJWT = async (uid='') => {

    return new Promise((resolve, reject) => {
        const payload = {uid};

        jwt.sign(payload,process.env.SECRETORPRIVATEKEY, {expiresIn: '2y'}, 
            (err, token)=> {
                if (err){
                    reject('Error generando el JWT');
                }else {
                    resolve(token);
                }
            }
        );
    })   
}
//_________________________________________________________________________________________

const validarJWThelper =async (token)=>{

    try{

        if(!token){
            return {error: true, msg:'No hay token en la peticion'}
        };
        const payload =jwt.verify(token,process.env.SECRETORPRIVATEKEY);
        const usuario = await Usuario.findOne({ _id: payload.uid });      
        if(usuario.estado){
            return usuario.correo
        }
        else{
            return {error:true,msg: 'Usuario borrado'}
        }
        
    }
    catch(err){
        console.log(err);       
        return {msg:'Token no valido'}    
    }
}

//_________________________________________________________________________________________

module.exports = {
    generarJWT,validarJWThelper
}