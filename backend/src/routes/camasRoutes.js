const express = require('express');
const { createCama, getAllCamas, getCamaById, updateCama, deleteCama } = require('../controllers/camaController');
const router = express.Router();

router.post('/', createCama);
router.get('/', getAllCamas);
router.get('/:id', getCamaById);
router.put('/:id', updateCama);
router.delete('/:id', deleteCama);

module.exports = router;