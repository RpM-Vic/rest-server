
//uploadRoute.js
const { Router } = require('express');
const  {check} = require('express-validator');
const {response} = require('express')
const path = require('path');

const uploadRoute = Router();
//_____________________________________________________________
uploadRoute.post('/',
    async (req,res=response)=>{

        if (!req.files.file1||!req.files || Object.keys(req.files).length === 0) {
            res.status(400).json({msg:'No files were uploaded.'});
            return;
        }

        console.log('req.files >>>', req.files); // eslint-disable-line

        const {file1} = req.files;

        const uploadPath = path.join(__dirname, '..', '/uploads/' , file1.name);

        file1.mv(uploadPath, (err) =>{
            if (err) {
                return res.status(500).json({err});
            }

            res.json({msg:'File uploaded to ' + uploadPath});
        });
    }
)

module.exports = {
    uploadRoute
}