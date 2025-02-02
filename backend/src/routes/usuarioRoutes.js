const express = require('express');
const { createUsuario, getAllUsuarios, getUsuarioById, updateUsuario, deleteUsuario } = require('../controllers/usuarioController');
const router = express.Router();

router.post('/', createUsuario);
router.get('/', getAllUsuarios);
router.get('/:id', getUsuarioById);
router.put('/:id', updateUsuario);
router.delete('/:id', deleteUsuario);

module.exports = router;