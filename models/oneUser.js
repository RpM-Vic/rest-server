
//oneUser.js
const{Schema,model}=require('mongoose')

const UsuarioSchema = Schema({
    nombre:{
        type:String,
        required:[true,"El nombre es obligatorio"]
    },
    correo:{
        type:String,
        required:[true,"El correo es obligatorio"]
    },
    password:{
        type:String,
        required:[true,"La contraseña es obligatoria"]
    },
    img:{
        type:String
    },
    rol:{
        type:String,
        required:true,
        //enum:['ADMIN_ROLE','USER_ROLE']
    },
    estado:{
        type:Boolean,
        default:true
    },
    google:{
        type:Boolean,
        default:false
    }
})
//tiene que serve fucion normal porque vamos a utilizar this. 
//y las funciones flecha mantienen el this afuera de la funcion
UsuarioSchema.methods.toJSON = function(){
    const {__v,password,_id,...usuario} =this.toObject()
    return usuario;
}
module.exports = model('Usuario',UsuarioSchema)
