
//auth.js
const { Router } = require('express');
const  {check} = require('express-validator');
const path = require('path');

const {login} = require('../controllers/authControl.js');
const validarCampos = require('../middlewares/validar_campos.js');
const validarJWT = require('../middlewares/validar-jwt');
const {googleVerify} = require('../helpers/googleVerify.js');
const Usuario=require('../models/oneUser');

//const {validaciones}= require('../middlewares'); //from index but i don't want to make hell of files



const routerAuth = Router();
//_____________________________________________________________
routerAuth.post('/login',[
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

//_____________________________________________________________
routerAuth.post('/google',[
    check('id_token','id_token es necesario').not().isEmpty(),

    validarCampos   

    ],async (req,res=response)=>{
        const {id_token}= req.body;

        try{
            const googleUser = await googleVerify(id_token);
            console.log(googleUser)
            res.status(200).json({
                message:'login de google correcto',
                googleUser
            })
        }
        catch(err){
            json.status(401).json({
                msg:'login de google incorrecto',
                error:err
            })

            console.log('error en el login de google',err)
        }
    }
)
routerAuth.get('/validate',[
        validarJWT,
        validarCampos 
    ],async(req,res=response)=>{

        const usuario = await Usuario.findOne({ _id: req.uid });
        console.log('usuario', usuario)
        if (usuario) {
        //if(true){
            res.status(200).json({
                ok:true,
                usuario
            })
        } else {
          res.status(404).json({ok:false, message: 'Usuario not found' });
        }
})



module.exports = routerAuth;
