
//users.js
const { Router } = require('express');

const {usuarios}= require('../controllers/controlUsers.js')

const router = Router();

router.get('/',usuarios.usuariosGET)
router.post('/',usuarios.usuariosPOST)
router.put('/:id',usuarios.usuariosPUT)
router.delete('/',usuarios.usuariosDELETE)
router.patch('/',usuarios.usuariosPATCH)

module.exports = router;
