const Huesped = require('../models/Huesped');
const Reserva = require('../models/Reserva');

exports.createHuesped = async (req, res) => {
    try {
        const huesped = new Huesped(req.body);

        if (req.body.reserva && req.body.reserva.length > 0) {
            
            const reservas = await Reserva.find({ '_id': { $in: req.body.reserva }});
            if (reservas.length !== req.body.reserva.length) {
                return res.status(400).json({ error: 'Algunas reservas no existen'});
            }
            huesped.reserva = req.body.reserva;
        }
        await huesped.save();
        res.status(201).json(huesped);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al crear el huésped' });
    }
};

exports.getAllHuespedes = async (req, res) => {
    try {
        const huespedes = await Huesped.find()
        .populate('reserva');
        res.status(200).json(huespedes);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error obteniendo los huéspedes'});
    }
};

exports.getHuespedById = async (req, res) => {
    const {id} = req.params;
    try {
        const huesped = await Huesped.findById(id)
        .populate('reserva');

        if (!huesped) {
            return res.status(404).json({ error: 'Huésped no encontrado' });
        }

        if(!huesped.reserva) {
            huesped.reserva = [];
        }

        res.status(200).json(huesped);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener el huésped' });
    }
};

exports.updateHuesped = async (req, res) => {
    const {id} = req.params;
    const updateData = req.body;

    try {
        const huesped = await Huesped.findById(id);

        if(!huesped) {
            return res.status(404).json({ error: 'Huésped no encontardo' });
        }
        //Actualizamos los campos del huesped
        Object.assign(huesped, updateData);

        if(updateData.reserva && updateData.reserva.length > 0) {
            const reservas = await Reserva.find({ '_id': {$in: updateData.reserva}});

            if (reservas.length !== updateData.reserva.length) {
                return res.status(400).json({ error: 'Algunas reservas no existen'});
            }

            huesped.reserva = updateData.reserva;
        }

        await huesped.save();
        res.status(200).json(huesped);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al actualizar el huesped'});
    }
};

exports.deleteHuesped = async (req, res) => {
    const {id} = req.params;

    try {
        const huesped = await Huesped.findByIdAndDelete(id);
        if(!huesped) {
            return res.status(404).json({ error: 'Huesped no encontrado'});
        }

        await Reserva.deleteMany({ '_id': {$in: huesped.reserva }});
        res.status(200).json({ message: 'El Huesped y sus reservas fueron eliminados exitosamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al eliminar el huesped' });        
    }
};