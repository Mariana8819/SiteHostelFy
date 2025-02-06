const mongoose = require('mongoose');

const ReservaSchema = new mongoose.Schema({
    huesped: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Huesped',
    },
    habitacion: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Habitacion',
    },
    empleado: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Empleado',
    },
    camas: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Cama',
    }],
    fechaCheckIn: {
        type: Date,
        required: true
    },
    fechaCheckOut: {
        type: Date,
        required: true
    },
    total: {
        type: Number,
        required: true
    },
    estado: {
        type: String,
        enum: [ 'confirmada', 'cancelada', 'completada'],
        required: true           
    },
});

module.exports = mongoose.model('Reserva', ReservaSchema);