const mongoose = require('mongoose');

const UsuarioSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    empleado: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Empleado',
    },
});

module.exports = mongoose.model('Usuario', UsuarioSchema);