
//db-valitators.js
const  Usuario = require('../models/oneUser.js')
const Role = require('../models/roles.js')

const esRoleValido = async(rol='ADMIN_ROLE')=>{
    const existeRol = await Role.findOne({rol});
    if(!existeRol){
        throw new Error(`el rol ${rol} no existe`);
    }
}

const eamilregistrado = async(correo='')=>{
    const existeCorreo = await Usuario.findOne({correo});
    if(existeCorreo){
        throw new Error(`el correo validator ${correo} ya existe`);
    }
}

const existeUsuarioPorId = async (id = '') => {
    try {
        const existeId = await Usuario.findById(id);
        if (!existeId) {
            throw new Error(`El ID ${id} no existe en la base de datos`);
        }
    } catch (error) {
        throw new Error(`Error al validar el ID: ${error.message}`);
    }
};

const allowedCollections = (collection='',collections=[])=>{
    const included = collections.includes(collection)
    if(!included){
        throw new Error(`la coleccion ${collection} no esta permitida`)
    }
    return true;
}



module.exports = {esRoleValido,eamilregistrado,existeUsuarioPorId,allowedCollections};