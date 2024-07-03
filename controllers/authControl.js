
//authControl.js
const {response} = require('express')
const bcrypt = require('bcryptjs');

const Usuario=require('../models/oneUser');
const {generarJWT}=require('../helpers/generarJWT')


const login = {
    loginpost: async (req,res=response)=>{
        const body = req.body;
        const {correo,password}=req.body;

        //el usuario est'a activo
        const usuario = await Usuario.findOne({correo});
        if(!usuario){
            return res.status(401).json({
                msg: 'acceso denegado - correo no existe',
                body,
                usuario
            })
        }
        if(usuario.status){
            return res.status(401).json({
                msg: 'acceso denegado - usuario eliminado',
                body,
                usuario
            })
        }
        //verificar la contraseña
        const validPassword =  bcrypt.compareSync(password,usuario.password);
        if(!validPassword){
            return res.status(401).json({
                msg: 'acceso denegado - password incorrecto',
                body,
                usuario
            })
        }
        //generar un token
        const seed1 =usuario._id;
        const seed2 =usuario.uid;
        const token = await generarJWT(seed1);

        //so todo sali'o bien, enviar token
        try{
            res.json({
                ok:true,
                msg:'login',
                seed1,
                seed2,
                token,
                body,
                usuario
            })
        }

        catch(error){
            console.log('error')
            return res.status(500).json({
                msg:"hable con el administrador"
            })
        }
    },
    //____________________________________________________________________________________
    logindelete: async (req,res=response)=>{
        //let usuarioQueBorra = new Usuario();
        const {uid} = req.params;

        //la uid params es del usuario que est'a tratando de borrar
        const usuarioQueBorra = await Usuario.findById(uid)

        //usuario es el que va a ser eliminado
        const body = req.body;
        const {correo}=req.body;

        const usuaroiBorrado = await Usuario.findOneAndUpdate({correo},{$set:{estado:false}});
        //findOne({correo});

        if(!usuaroiBorrado.estado){
            return res.estado(401).json({
                msg: 'acceso denegado - usuario eliminado',
                body,
                usuaroiBorrado
            })
        }

        //so todo sali'o bien, enviar token
        try{
            return res.status(402).json({
                ok:true,
                msg:'login',
                //token,
                usuarioQueBorra
                ,usuaroiBorrado
            })
        }catch(error){
            console.log('error')
            return res.status(500).json({
                msg:"hable con el administrador",
                msg2:error,
            })
        }
    }
}
module.exports = {
    login
}

