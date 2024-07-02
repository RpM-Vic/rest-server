
//controlUsers.js
const bcryptjs = require('bcryptjs');
const { response ,request} = require('express');



const Usuario = require('../models/oneUser');


const usuarios = {
    usuariosGET: async (req=request, res = response) => {
        const {id=6,nombre='juan',apikey='D234SFFS', limit=5, desde=1} = req.query;
        const filtro = {estado:true};

        const totalNumero = Usuario.countDocuments(filtro)
        const totalObjects =Usuario.find(filtro) //filtro  
            .skip(parseInt(desde))  //desde donde empieza
            .limit(parseInt(limit)) //desde donde termina

        const resp = await Promise.all([totalNumero,totalObjects])        

        res.status(403).json({
            ok: true,
            msg: 'api get desde el controlador',
            query:{id,nombre,apikey},
            totalNumero: resp[0],
            totalObjects:resp[1]
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
    usuariosPATCH: async (req, res = response) => {
        const id = req.params.id;

        const usuario = await Usuario.findByIdAndUpdate(id, req.body, { new: true });

        res.status(203).json({
            ok: true,
            msg: 'api patch desde el controlador',
            id,
            usuario
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
    usuariosDELETE: async (req, res = response) => {
        const id = req.params.id;

        //const usuario = await Usuario.findByIdAndDelete(id);
        const usuario = await Usuario.findByIdAndUpdate(id,{estado:false});

        res.status(203).json({
            ok: true,
            msg: 'api delete desde el controlador',
            id,
            usuario
        });
    }
};

module.exports = { usuarios };