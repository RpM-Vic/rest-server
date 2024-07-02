
//controlUsers.js
const bcryptjs = require('bcryptjs');
const { response ,request} = require('express');



const Usuario = require('../models/oneUser');


const usuarios = {
    usuariosGET: (req=request, res = response) => {
        const {id=6,nombre='juan',apikey='D234SFFS'} = req.query;

        res.status(403).json({
            ok: true,
            msg: 'api get desde el controlador',
            query:{id,nombre,apikey}
        });
    },
    //_____________________________________________________________________________________________________________


    usuariosPOST: async (req, res = response) => {

        //const{nombre, ...cola} = req.body; //con esto se desestructuran todos los elementos aunque sean 100 
        const {nombre,correo,password,rol}= req.body;
        const usuario = new Usuario({nombre,correo,password,rol});

        //hacer hash de la contraseña
        const salt = bcryptjs.genSaltSync();
        usuario.password = bcryptjs.hashSync(usuario.password,salt)


        await usuario.save()
        .catch((err, usuarioDB)=>{
            console.log('error',err);
        })

        res.status(201).json({
            ok: true,
            msg: 'api post desde el controlador',
            usuario
        });
    },
    //_____________________________________________________________________________________________________________
    usuariosPATCH: (req, res = response) => {
        res.status(403).json({
            ok: true,
            msg: 'api patch desde el controlador'
        });
    },
    //_____________________________________________________________________________________________________________

    usuariosPUT: async (req=request, res = response) => {
        //const id = req.params.id;
        const {id} = req.params;
        const {_id,password,google,correo,...resto}=req.body;
        const body2=req.body

        //validar contra base de datos
        const usuario = await Usuario.findByIdAndUpdate(id,{...resto},{new:true})
        
        if(password){
            const salt = bcryptjs.genSaltSync();
            const password2 = bcryptjs.hashSync(password,salt)
        } 
        
        res.status(200).json({
            ok: true,
            msg: 'api put desde el controlador',
            id,
            _id,
            usuario,
            body2
        });
    },
    //_____________________________________________________________________________________________________________
    usuariosDELETE: (req, res = response) => {
        res.status(403).json({
            ok: true,
            msg: 'api delete desde el controlador'
        });
    }
};

module.exports = { usuarios };