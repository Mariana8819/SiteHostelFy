const mongoose = require('mongoose');

const HabitacionSchema = new mongoose.Schema({
    numero: { 
        type: String,
        required: true,
        unique: true
    },
    tipo: {
        type: String,
        required: true
    },
    precio: {
        type: Number,
        required: true
    },
    estado: {
        type: String,
        enum: ['disponible', 'ocupada'],
        required: true
    },
    camas: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Cama',
    }],
    reserva: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Reserva'
    }],
});

module.exports = mongoose.model('Habitacion', HabitacionSchema);