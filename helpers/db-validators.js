const Role = require('../models/roles.js')

const esRoleValido = async(rol='')=>{
    const existeRol = await Role.findOne({rol});
    if(!existeRol){
        throw new Error(`el rol ${rol} no existe`);
    }
}

module.exports = {esRoleValido};