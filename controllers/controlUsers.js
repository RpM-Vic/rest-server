
//controlUsers.js
const { response ,request} = require('express');

const usuarios = {
    usuariosGET: (req=request, res = response) => {
        const {id,nombre,apikey='D234SFFS'} = req.query;


        res.status(403).json({
            ok: true,
            msg: 'api get desde el controlador',
            query:{id,nombre,apikey}
        });
    },
    usuariosPOST: (req, res = response) => {
        const {nombre,edad} = req.body;


        res.status(403).json({
            ok: true,
            msg: 'api post desde el controlador',
            body:{nombre,edad}
        });
    },
    usuariosPATCH: (req, res = response) => {
        res.status(403).json({
            ok: true,
            msg: 'api patch desde el controlador'
        });
    },
    usuariosPUT: (req, res = response) => {
        const id = req.params.id;


        res.status(403).json({
            ok: true,
            msg: 'api put desde el controlador',
            id,
        });
    },
    usuariosDELETE: (req, res = response) => {
        res.status(403).json({
            ok: true,
            msg: 'api delete desde el controlador'
        });
    }
};

module.exports = { usuarios };