const express = require('express');
const { createReserva, getAllReservas } = require('../controllers/reservaController');
const router = express.Router();

router.post('/', createReserva);
router.get('/', getAllReservas);

module.exports = router;