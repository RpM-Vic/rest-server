
//uploadRoute.js
const { Router } = require('express');
const  {check} = require('express-validator');
const {req,response} = require('express')
const path = require('path')
const cloudinary = require('cloudinary').v2;

const {uploadFunction} =require('../helpers/uploadFunction');
const validarCampos = require('../middlewares/validar_campos');
const { allowedCollections,eamilregistrado,existeUsuarioPorId } = require('../helpers/db-validators');
const Usuario = require('../models/oneUser');

const uploadRoute = Router();
//_____________________________________________________________
uploadRoute.post('/',[
    check('correo').custom(eamilregistrado),
    validarCampos
],
    async (req,res=response)=>{

        try {
            const result = await uploadFunction(req.files);
            res.status(200).json(result);
        } catch (error) {
            res.status(error.status || 500).json({ msg: error.message });
        }
    

    }
)
//_____________________________________________________________
uploadRoute.put('/:colection?/:id?',[
    check('id','el id debe ser un mongoid').isMongoId(),
    check('id').custom( existeUsuarioPorId), //est'a funcion me avisa si no encuentra el id en la base de datos
    check('colection').custom(collection=>allowedCollections(collection,['usuarios','productos'])),
    validarCampos 
],

    async (req,res=response)=>{
        const  {colection,id}= req.params;

        try {
            const {newName}= await uploadFunction(id,req.files); //newName es un string

            const usuario = await Usuario.findByIdAndUpdate(id, {img:newName}, { new: true });
            res.status(200).json({
                colection,
                id,
                usuario,
                newName
            });     

        } catch (error) {
            res.status(error.status || 500).json({ msg: error.message });
        }
    }
)
//_____________________________________________________________
uploadRoute.get('/:colection?/:id?',[
    check('id','el id debe ser un mongoid').isMongoId(),
    check('id').custom( existeUsuarioPorId), //est'a funcion me avisa si no encuentra el id en la base de datos
    check('colection').custom(collection=>allowedCollections(collection,['usuarios','productos'])),
    validarCampos 
],

    async (req,res=response)=>{
        const  {id}= req.params;

        try {
            const usuario = await Usuario.findById(id);
            const location = path.join(__dirname, '../uploads', usuario.img);
            res.status(200).sendFile(location);
             

        } catch (error) {
            res.status(401)
            .sendFile(path.join(__dirname, '../public', 'notFound.html'));
        }
    }
)




module.exports = {
    uploadRoute
}