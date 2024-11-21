// models/Venta.js

const mongoose = require('mongoose');

// Definir el esquema para una venta
const VentaSchema = new mongoose.Schema({
  cliente: {
    type: String,
    required: true,
  },
  cantidad: {
    type: Number,
    required: true,
  },
  precio_total: {
    type: Number,
    required: true,
  },
  fecha_venta: {
    type: Date,
    default: Date.now,
  },
  pollos_vendidos: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Pollo',
  }],
});

module.exports = mongoose.model('Venta', VentaSchema);
