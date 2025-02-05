const mongoose = require('mongoose');

const CamaSchema = new mongoose.Schema({
    numero: {
        type: Number,
        required: true,
    },
    tipo: {
        type: String,
        enum: [ 'matrimonial', 'sencilla'],
        required: true,
    },
    estado: {
        type:String,
        enum: ['disponible', 'reservada','ocupada', 'bloqueada'],
        default: 'disponible',
    },
    habitacion: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Habitacion',
        required: true,
    },
    reserva: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Reserva',
        default:null,
    },
});

module.exports = mongoose.model('Cama', CamaSchema);