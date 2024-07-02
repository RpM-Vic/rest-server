
//generarJWT.js
const jwt = require('jsonwebtoken');
const generarJWT = (uid='') => {

    return new Promise((resolve, reject) => {
        const payload = {uid};

        jwt.sign(payload,'secret', {expiresIn: '4h'}, 
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