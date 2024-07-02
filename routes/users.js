
//users.js
const { Router } = require('express');
const  {check} = require('express-validator');


const {esRoleValido,eamilregistrado,existeUsuarioPorId} = require('../helpers/db-validators.js');
const {usuarios}= require('../controllers/controlUsers.js');
const validarCampos = require('../middlewares/validar_campos.js');

const router = Router();
//__________________________________________________________________
router.get('/',usuarios.usuariosGET)
//__________________________________________________________________
router.post('/',[
    check('nombre','el nombre es obligatorio').not().isEmpty(),
    check('password','el pass debe tener 6 letras').isLength({min :6}),
    check('correo','correo no es valido').isEmail(),
    check('correo').custom(eamilregistrado),
    //check('rol','No es un rol valido').isIn(['ADMIN_ROLE','USER_ROLE']),
    check('rol').custom(esRoleValido),

    validarCampos

],usuarios.usuariosPOST)
//________________________________________________________________________________
router.put('/:id',[
    check('id','el id debe ser un mongoid').isMongoId(),// este es el formato correcto
    check('id').custom( existeUsuarioPorId), //localhost:3000/api/usuarios/66808535bed962255a264d86 
    check('rol').custom(esRoleValido),
    validarCampos

],
usuarios.usuariosPUT)
//________________________________________________________________________________
router.delete('/:id',[
    check('id','el id debe ser un mongoid').isMongoId(),// este es el formato correcto
    check('id').custom( existeUsuarioPorId), //localhost:3000/api/usuarios/66808535bed962255a264d86 
    validarCampos
],usuarios.usuariosDELETE)
//________________________________________________________________________________
router.patch('/',[
    check('id','el id debe ser un mongoid').isMongoId(),// este es el formato correcto
    check('id').custom( existeUsuarioPorId), //localhost:3000/api/usuarios/66808535bed962255a264d86 
    validarCampos
],usuarios.usuariosPATCH)

module.exports = router;

