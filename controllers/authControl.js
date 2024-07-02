
//authControl.j
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
        const token = await generarJWT(usuario.uid);

        //so todo sali'o bien, enviar token
        try{
            res.json({
                ok:true,
                msg:'login',
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
        const body = req.body;
        const {correo}=req.body;

        const usuario = await Usuario.findOne({correo});

        if(!usuario.estado){
            return res.estado(401).json({
                msg: 'acceso denegado - usuario eliminado',
                body,
                usuario
            })
        }

        //so todo sali'o bien, enviar token
        try{
            res.json({
                ok:true,
                msg:'login',
                //token,
                body,
                usuario
            })
        }
    
        catch(error){
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

