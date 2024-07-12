
//generarJWT.js
const jwt = require('jsonwebtoken');
require('dotenv').config();

const generarJWT = async (uid='') => {

    return new Promise((resolve, reject) => {
        const payload = {uid};

        jwt.sign(payload,process.env.SECRETORPRIVATEKEY, {expiresIn: '2y'}, 
            (err, token)=> {
                if (err){
                    reject('Error generando el JWT');
                }else {
                    resolve(token);
                }
            }
        );
    })   
}


module.exports = {
    generarJWT
}