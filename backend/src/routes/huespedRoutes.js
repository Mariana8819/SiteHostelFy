const express = require('express');
const { createHuesped, getAllHuespedes, getHuespedById, updateHuesped, deleteHuesped } = require('../controllers/huespedController');
const router = express.Router();


router.post('/', createHuesped );
router.get('/', getAllHuespedes);
router.get('/:id', getHuespedById);
router.put('/:id', updateHuesped);
router.delete('/:id', deleteHuesped);

module.exports = router;