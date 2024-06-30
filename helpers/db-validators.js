
//db-valitators.js
const  Usuario = require('../models/oneUser.js')
const Role = require('../models/roles.js')

const esRoleValido = async(rol='')=>{
    const existeRol = await Role.findOne({rol});
    if(!existeRol){
        throw new Error(`el rol ${rol} no existe`);
    }
}

const eamilregistrado = async(correo='')=>{
    const existeCorreo = await Usuario.findOne({correo});
    if(existeCorreo){
        throw new Error(`el correo validator ${existeCorreo} ya existe`);
    }
}


module.exports = {esRoleValido,eamilregistrado};