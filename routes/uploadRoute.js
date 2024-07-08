
//uploadRoute.js
const { Router } = require('express');
const  {check} = require('express-validator');
const {req,response} = require('express')
const {uploadFunction} =require('../helpers/uploadFunction');
const validarCampos = require('../middlewares/validar_campos');
const { allowedCollections } = require('../helpers/db-validators');

const uploadRoute = Router();
//_____________________________________________________________
uploadRoute.post('/',
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
    check('colection').custom(collection=>allowedCollections(collection,['usuarios','productos'])),
    validarCampos
],

    async (req,res=response)=>{
        const  {colection,id}= req.params;
        res.status(200).json({
            colection,
            id
        });


        try {
            const result = await uploadFunction(req.files);
            res.status(200).json(result);
        } catch (error) {
            res.status(error.status || 500).json({ msg: error.message });
        }


    }
)

module.exports = {
    uploadRoute
}