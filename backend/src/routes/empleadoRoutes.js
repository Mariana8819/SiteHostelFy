const express = require('express');
const { createEmpleado, getAllEmpleados, getEmpleadoById, updateEmpleado, deleteEmpleado } = require('../controllers/empleadoController');
const router = express.Router();

router.post('/', createEmpleado);
router.get('/', getAllEmpleados);
router.get('/:id', getEmpleadoById);
router.put('/:id', updateEmpleado);
router.delete('/:id', deleteEmpleado);

module.exports = router;