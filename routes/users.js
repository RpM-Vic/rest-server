
//users.js
const { Router } = require('express');
const  {check} = require('express-validator');


const {esRoleValido,eamilregistrado,existeUsuarioPorId} = require('../helpers/db-validators.js');
const {usuarios}= require('../controllers/controlUsers.js');
const validarCampos = require('../middlewares/validar_campos.js');

const router = Router();

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
    check('id','el id debe ser un mongoid').isMongoId(),
    check('id').custom( existeUsuarioPorId),  
    check('rol').custom(esRoleValido),
    validarCampos

],
usuarios.usuariosPUT)
//________________________________________________________________________________
router.delete('/',usuarios.usuariosDELETE)
router.patch('/',usuarios.usuariosPATCH)

module.exports = router;

