const Habitacion = require('../models/Habitacion');
const Reserva = require('../models/Reserva');

exports.createHabitacion = async (req, res) => {
    try {
        const habitacion = new Habitacion(req.body);
        await habitacion.save();
        res.status(201).json(habitacion);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al crear la habitacion'})
    }
};

exports.getAllHabitaciones = async (req, res) => {
    try {
        const habitaciones = await Habitacion.find()
        .populate('reserva');
        res.status(200).json(habitaciones);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'error al obtener las habitaciones' });
    }
};

exports.getHabitacionById = async (req, res) => {
    const {id} = req.params;
    try {
        const habitacion = await Habitacion.findById(id)

        if(!habitacion){
            return res.status(404).json({ error: 'Habitacion no encontrada' });
        }
        res.status(200).json(habitacion);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'error al obtener la habitacion' });
    }
};

exports.updateHabitacion = async (req, res) => {
    const {id} = req.params;
    const updateData = req.body;

    try {
        const habitacion = await Habitacion.findById(id);

        if(!habitacion){
            return res.status(404).json({ error: 'Habitacion no encontrada' });
        }

        //Si se actualizan las reservas
        if (updateData.reserva && updateData.reserva.length > 0) {
            const reservas = await Reserva.find({ '_id': {$in: updateData.reserva}});

            if(reservas.length !== updateData.reserva.length) {
                return res.status(400).json({ error: 'Algunas reservas no existen' });
            }
        }

        //Actualizamos los campos de la habitacion que se pasan por solicitud
        for(let key in updateData) {
            if(updateData.hasOwnProperty(key)) {
                habitacion[key] = updateData[key];
            }
        }

        await habitacion.save();
        res.status(200).json(habitacion)
    } catch (error) {
        console.error(error);
        res.status(500).json({ error:' Error al actualizar la habitación'})
    }
}

exports.deleteHabitacion = async (req, res) => {
    const {id} = req.params;

    try {
        const habitacion = await Habitacion.findByIdAndDelete(id);
      
        if(!habitacion) {
            return res.status(404).json({ error: 'No se encontro la habitación. '});
        }

        res.status(200).json({ message: 'La habitación se elimino exitosamente.'})
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al eliminar la habitación.'})
    }
}