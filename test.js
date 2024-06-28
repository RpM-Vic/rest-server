const {Router} = require('express');
const {usuarios} = require('../controllers/controlUsers.js');

const router = Router();

router.get('/',usuarios.usuariosGET)
module.exports = router;