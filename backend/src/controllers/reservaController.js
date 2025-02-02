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

 exports.getReservById = async (req, res) => {
    const {id} = req.params;

    try {
        const reserva = await Reserva.findById(id)
        .populate('empleado')
        .populate('huesped')
        .populate('habitacion');

        if(!reserva){
            return res.status(404).json({ error:'Reserva no encontrada'});
        }

        res.status(200).json(reserva)
    } catch (error) {
        console.error(error);
        res.status(500).json({error: 'error al obtener la reserva.'})
    }
 };

 exports.updateReserva = async (req, res) => {
    const {id} = req.params;
    const updateData = req.body;

    try {
        const reserva = await Reserva.findById(id);

        if(!reserva){
            return res.status(404).json({ error: 'Reserva no encontrada'});
        }

        //Si se actualiza  'huesped', validamos que el huesped exista 
        if (updateData.huesped) {
            const huesped = await Huesped.findById(updateData.huesped);
            if(!huesped){
                return re.status(404).json({ error: 'Huesped no encontrado' });
            }
        }

        //Si se actualiza el campo 'habitación' , validamos que exista
        if (updateData.habitacion){
            const habitacion = await Habitacion.findById(updateData.habitacion);
            if(!habitacion){
                return res.status(404).json({ error: 'Habitacion no encontrada' });
            } 
        }

        if(updateData.empleado){
            const empleado = await Empleado.findById(updateData.empleado);
            if(!empleado){
                return res.status(404).json({ error: 'Empleado no encontrado' });
            }
        }

        for(let key in updateData) {
            if(updateData.hasOwnProperty(key)){
                reserva[key] = updateData[key];
            }
        }

        await reserva.save();
        res.status(200).json(reserva)
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'error al actualizar la reserva'})
    }
 }

 exports.deleteReserva = async (req, res) => {
    const {id} = req.params;

    try {
        const reserva = await Reserva.findByIdAndDelete(id);
        
        if(!reserva){
            return res.status(404).json({ error: 'No se encontro la reserva'})
        }

        res.status(200).json({ message: 'La reserva se elimino exitosamente'})
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al eliminar la reserva'})
    }
 }