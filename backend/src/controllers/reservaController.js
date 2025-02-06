const Huesped = require('../models/Huesped');
const Habitacion = require('../models/Habitacion');
const Empleado = require('../models/Empleado');
const Reserva = require('../models/Reserva');
const Cama = require('../models/Cama');

 exports.createReserva = async (req, res) => {
    try {
        const {camas, habitacion, ...restoReserva } = req.body;

        //verificar que las cmas seleccionadas están disponibles
        const camasObj = await Cama.find({ '_id': {$in: camas }, estado: 'disponible'});
        if(camasObj.length !== camas.length) {
            return res.status(400).json({ error: 'Algunas camas no existen.' });
        }

        const reserva = new Reserva(restoReserva);
        await reserva.save();

        //Actualizar el estado de las camas a 'reservada
        await Cama.updateMany(
            { '_id' : { $in: camas }},
            { $set: { estado: 'reservada', reserva: reserva._id }}
        );
        
        res.status(201).json(reserva);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al crear la reserva'})
    }
 };

 exports.createReservaWithHuesped = async (req, res) => {
    try {
        const {nombre, apellido, dni, telefono, domicilio, email, reservaData } = req.body;

        const camas = reservaData.camas;

        if(!camas || camas.length === 0){
        return res.status(400).json({ error: 'No se han proporcionado camas para la reserva'})
        }

         //verificar que las cmas seleccionadas están disponibles
         const camasObj = await Cama.find({ '_id': {$in: camas }});
         console.log('Camas seleccionadas:', camas);  // Log de camas pasadas
         console.log('Camas encontradas:', camasObj);

         if(camasObj.length !== camas.length) {
             return res.status(400).json({ error: 'Algunas camas no existen.' });
         }
        
        const huesped = new Huesped({
            nombre: nombre,
            apellido: apellido,
            dni: dni,
            telefono: telefono,
            domicilio: domicilio,
            email: email,
        });

        await huesped.save();

        const reserva = new Reserva({
            huesped: huesped._id,  // Asignamos el ID del huesped recién creado
            cama: camas,  //Asignamos el Id de la cama
            habitacion: reservaData.habitacion,
            empleado: reservaData.empleado,
            fechaCheckIn: reservaData.fechaCheckIn,
            fechaCheckOut: reservaData.fechaCheckOut,
            total: reservaData.total,
            estado: reservaData.estado,
        });

        await reserva.save();

        // Actualizamos el estado de todas las camas
        await Cama.updateMany(
            { '_id': { $in: camas } },  // Actualiza todas las camas
            { $set: { estado: 'reservada', reserva: reserva._id } }
        );

        //Asociamos las camas a la reserva 
        reserva.camas = camasObj.map(cama => cama._id);
        await reserva.save();

        //Actualizar la relacion con el Huesped
        huesped.reserva.push(reserva._id);
        await huesped.save();

        res.status(201).json({ message: 'Reserva y huésped creados exitosamente', huesped, reserva });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al crear la reserva o el huésped'})
    }
 }

 exports.getAllReservas = async (req, res) => {
    try {
        const reservas = await Reserva.find()
        .populate('huesped')
        .populate('habitacion')
        .populate('empleado')
        .populate('camas')

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
        .populate('habitacion')
        .populate('camas')

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

        //Liberar las cmas asociadas
        await Cama.updateMany(
            { reserva: reserva._id},
            { $set: {estado: 'disponible', reserva: null }}
        );

        res.status(200).json({ message: 'La reserva se elimino exitosamente'})
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al eliminar la reserva'})
    }
 }