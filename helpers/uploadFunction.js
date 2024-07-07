

const { Router } = require('express');
const path = require('path');

const uploadFunction=(files,permitedExtensions=['jpg','png','webp'])=>{
    return new Promise((resolve,reject)=>{
        const {file1} = files;
        const cutName = file1.name.split('.');
        console.log('cutName  >>>', cutName);
        const extension = cutName[cutName.length -1];

        if(!permitedExtensions.includes(extension)) {
            return reject(`The extension ${extension} is not permited`);
        }      
        const newName = `${Date.now()}.${extension}`;
        const uploadPath = path.join(__dirname, '..', '/uploads/' , newName);

        file1.mv(uploadPath, (err) =>{
            if (err) {
                reject(err);
            }

            resolve({msg:'File uploaded to ' + uploadPath});
        });
        resolve({uploadPath,extension});

    })

}

module.exports={ uploadFunction}