// controllers/CamaController.js
const Cama = require('../models/Cama');
const Habitacion = require('../models/Habitacion');
const Reserva = require('../models/Reserva');

// Crear cama
exports.createCama = async (req, res) => {
    try {
        const cama = new Cama(req.body);
        
        // Verificar que la habitación a la que pertenece la cama exista
        const habitacion = await Habitacion.findById(cama.habitacion);
        if (!habitacion) {
            return res.status(404).json({ error: 'La habitación no existe' });
        }

        await cama.save();
        res.status(201).json(cama);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al crear la cama' });
    }
};

// Obtener todas las camas
exports.getAllCamas = async (req, res) => {
    try {
        const camas = await Cama.find().populate('habitacion').populate('reserva');
        res.status(200).json(camas);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener las camas' });
    }
};

// Obtener cama por ID
exports.getCamaById = async (req, res) => {
    const { id } = req.params;
    
    try {
        const cama = await Cama.findById(id).populate('habitacion').populate('reserva');
        if (!cama) {
            return res.status(404).json({ error: 'Cama no encontrada' });
        }
        res.status(200).json(cama);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener la cama' });
    }
};

// Actualizar cama
exports.updateCama = async (req, res) => {
    const { id } = req.params;
    const updateData = req.body;

    try {
        const cama = await Cama.findById(id);

        if (!cama) {
            return res.status(404).json({ error: 'Cama no encontrada' });
        }

        // Actualizar los campos de la cama
        for (let key in updateData) {
            if (updateData.hasOwnProperty(key)) {
                cama[key] = updateData[key];
            }
        }

        await cama.save();
        res.status(200).json(cama);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al actualizar la cama' });
    }
};

// Eliminar cama
exports.deleteCama = async (req, res) => {
    const { id } = req.params;

    try {
        const cama = await Cama.findByIdAndDelete(id);

        if (!cama) {
            return res.status(404).json({ error: 'Cama no encontrada' });
        }

        res.status(200).json({ message: 'Cama eliminada exitosamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al eliminar la cama' });
    }
};
