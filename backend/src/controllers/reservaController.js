 const Huesped = require('../models/Huesped');
 const Habitacion = require('../models/Habitacion');
 const Empleado = require('../models/Empleado');
const Reserva = require('../models/Reserva');

 exports.createReserva = async (req, res) => {
    try {
        const reserva = new Reserva(req.body);
        await reserva.save();

        res.status(201).json(reserva);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al crear la reserva'})
    }
 };

 exports.getAllReservas = async (req, res) => {
    try {
        const reservas = await Reserva.find()
        .populate('huesped')
        .populate('habitacion')
        .populate('empleado');

        res.status(200).json(reservas);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener las reservas'});
    }
 }