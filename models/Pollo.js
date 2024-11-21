// models/Pollo.js

const mongoose = require('mongoose');

const PolloSchema = new mongoose.Schema({
    peso: {
        type: Number,
        required: true,
    },
    fecha_nacimiento: {
        type: Date,
        required: true,
    },
    raza: {
        type: String,
        required: true,
    },
    estado_salud: {
        type: String,
        enum: ['Saludable', 'Enfermo', 'Recuperación'],
        required: true,
    },
    fecha_registro: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Pollo', PolloSchema);

