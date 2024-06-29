
//roles.js
const {Schema,model}= require('mongoose')

const Roleschema = new Schema({
    rol:{
        type:String,
        required:[true,'El rol es obligatorio']
    }
})

module.exports= model('Role',Roleschema)