
//users.js
const { Router } = require('express');
const  {check} = require('express-validator');


const {esRoleValido} = require('../helpers/db-validators.js');
const {usuarios}= require('../controllers/controlUsers.js');
const validarCampos = require('../middlewares/validar_campos');

const router = Router();

router.get('/',usuarios.usuariosGET)
router.post('/',[
    check('nombre','el nombre es obligatorio').not().isEmpty(),
    check('password','el pass debe tener 6 letras').isLength({min :6}),
    check('correo','correo no es valido').isEmail(),
    //check('rol','No es un rol valido').isIn(['ADMIN_ROLE','USER_ROLE']),
    check('rol').custom((rol)=>esRoleValido(rol)),

    validarCampos

],usuarios.usuariosPOST)
router.put('/:id',usuarios.usuariosPUT)
router.delete('/',usuarios.usuariosDELETE)
router.patch('/',usuarios.usuariosPATCH)

module.exports = router;
