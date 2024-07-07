
//uploadRoute.js
const { Router } = require('express');
const  {check} = require('express-validator');
const {response} = require('express')
const {uploadFunction} =require('../helpers/uploadFunction')


const uploadRoute = Router();
//_____________________________________________________________
uploadRoute.post('/',
    async (req,res=response)=>{

        if (!req.files.file1||!req.files || Object.keys(req.files).length === 0) {
            res.status(400).json({msg:'No files were uploaded.'});
            return;
        }
        const {uploadPath,extension}=await uploadFunction(req.files);
        res.status(201).json({
            msg: 'Files have been uploaded',
            uploadPath
        });
    }
)

module.exports = {
    uploadRoute
}