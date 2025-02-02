const mongoose = require('mongoose');

const HuespedSchema = new mongoose.Schema({
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
    domicilio: {
        type: String,
        required: true
    },
    email: {
        type:String,
        required: true,
        unique:true
    },
    reserva: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Reserva'
    }],
});

module.exports = mongoose.model('Huesped', HuespedSchema);