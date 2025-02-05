const express = require('express');
const { createReserva, getAllReservas, getReservById, updateReserva, deleteReserva, createReservaWithHuesped } = require('../controllers/reservaController');
const router = express.Router();

router.post('/reserva-huesped', createReservaWithHuesped);

router.post('/', createReserva);
router.get('/', getAllReservas);
router.get('/:id', getReservById);
router.put('/:id', updateReserva);
router.delete('/:id', deleteReserva);

module.exports = router;