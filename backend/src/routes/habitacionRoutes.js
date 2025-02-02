const express = require('express');
const { createHabitacion, getAllHabitaciones, getHabitacionById, updateHabitacion, deleteHabitacion } = require('../controllers/habitacionController');
const router = express.Router();

router.post('/', createHabitacion);
router.get('/', getAllHabitaciones);
router.get('/:id', getHabitacionById);
router.put('/:id', updateHabitacion);
router.delete('/:id', deleteHabitacion);

module.exports = router;