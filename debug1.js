const path = require('path')

const { generarJWT } = require(path.join(__dirname,'helpers/generarJWT'));

console.log(generarJWT('66905ecc3344b195cb33ab35'));