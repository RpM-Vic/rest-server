
//auth.js
const { Router } = require('express');
const  {check} = require('express-validator');

const {login} = require('../controllers/authControl.js');
const validarCampos = require('../middlewares/validar_campos.js');
const validarJWT = require('../middlewares/validar-jwt');



const routerAuth = Router();
//_____________________________________________________________
routerAuth.post('/login',[
    //validarJWT,
    check('password','contraseña requerida').not().isEmpty(),
    check('correo','correo no es valido').isEmail(),
    validarCampos   

],login.loginpost)
//_____________________________________________________________
routerAuth.delete('/login:uid',[
    validarJWT,
    check('password','contraseña requerida').not().isEmpty(),
    check('correo','correo no es valido').isEmail(),
    validarCampos   

],login.logindelete)


module.exports = routerAuth;