
//controlUsers.js
const bcryptjs = require('bcryptjs');
const { response ,request} = require('express');



const Usuario = require('../models/oneUser');


const usuarios = {
    usuariosGET: (req=request, res = response) => {
        const {id,nombre,apikey='D234SFFS'} = req.query;

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

        //verificar si existe el correo
        const existeEmail= await Usuario.findOne({correo});
        if (existeEmail) {
            return res.status(400).json({
                ok: false,
                msg:'El correo ya existe'
            })        
        }

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

    usuariosPUT: (req, res = response) => {
        const id = req.params.id;


        res.status(403).json({
            ok: true,
            msg: 'api put desde el controlador',
            id,
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