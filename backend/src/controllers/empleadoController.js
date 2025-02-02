const Empleado = require('../models/Empleado');
const Usuario = require('../models/Usuario');
const Reserva = require('../models/Reserva');

exports.createEmpleado = async (req, res) => {
    try {        
        const empleado = new Empleado(req.body);
        await empleado.save();

        res.status(201).json(empleado);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al crear el empleado' });
    }
};

exports.getAllEmpleados = async ( req, res) => {
    try {
        const empleados = await Empleado.find()
        .populate('usuario')
        .populate('reserva');
        res.status(200).json(empleados);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener los empleados' });
    }
};

exports.getEmpleadoById = async (req, res) => {
    const {id} = req.params;
    try {
        const empleado = await Empleado.findById(id)
        .populate('usuario')
        .populate('reserva');

        if(!empleado) {
            return res.status(404).json({ error: 'Empleado no encontrado'});
        }

        res.status(200).json(empleado);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'error al obtener el empleado' });
    }
};

exports.updateEmpleado = async (req, res) => {
    const {id} = req.params;
    const updateData = req.body;

    try {
       const empleado = await Empleado.findById(id);

       if(!empleado) {
        return res.status(404).json({ error: 'Empleado no encontrado'});
       }

       //si se intenta actualizar el campo 'usuario
       if(updateData.usuario) {
        const usuario = await Usuario.findById(updateData.usuario);
        if(!usuario){
            return res.status(404).json({ error: 'Usuario no encontrado'});
        }
       }

       //Si se actualizan las reservas
       if(updateData.reserva && updateData.reserva.length > 0) {
        const reservas = await Reserva.find({ '_id': { $in: updateData.reserva}});

        if(reservas.length !== updateData.reserva.length) {
            return res.status(400).json({ error: 'Algunas reservas no existen'});
        }
       }

       //Actualizamos los campos del empleado, pero solo los campos enviados en la solicitud
       for(let key in updateData) {
        if(updateData.hasOwnProperty(key)) {
            empleado[key] = updateData[key];
        }
       }
       
      await empleado.save();
      res.status(200).json(empleado)
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al actualizar el empleado' });
    }
}

exports.deleteEmpleado = async (req, res) => {
    const {id} = req.params;
    try {
        const empleado = await Empleado.findByIdAndDelete(id);

        if(!empleado){
            return res.status(404).json({ error: 'Empleado no encontrado'});
        }

        res.status(200).json({ message: 'Empleado eliminado exitosamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al eliminar el empleado'});
    }
};