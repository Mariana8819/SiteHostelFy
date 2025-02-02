const mongoose = require('mongoose');

const EmpleadoSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    apellido: {
        type: String,
        required: true
    },
    dni: {
        type: String,
        required: true,
        unique: true
    },
    telefono: {
        type: String,
        required: true
    },
    domicilio:{
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    rol: {
        type:String,
        enum: [ 'Admin', 'empleado'],
        required: true
    },
    usuario: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario',
    },
    reserva: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Reserva'
    }],
});

module.exports = mongoose.model('Empleado', EmpleadoSchema);