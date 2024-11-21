const express = require('express');
const router = express.Router();
const Venta = require('../models/Venta'); // Importa el modelo de Venta

// Ruta para registrar una nueva venta
router.post('/nueva', async (req, res) => {
    try {
        const nuevaVenta = new Venta(req.body);
        await nuevaVenta.save();
        // Enviar una respuesta JSON en lugar de texto plano
        res.status(201).json({ message: 'Venta registrada correctamente' }); 
    } catch (error) {
        console.error('Error al registrar la venta:', error);
        res.status(500).send(`Error al registrar la venta: ${error.message}`); 
    }
});

// Ruta para obtener todas las ventas
router.get('/', async (req, res) => {
    try {
        const ventas = await Venta.find().populate('pollos_vendidos'); 
        res.json(ventas);
    } catch (error) {
        console.error('Error al obtener las ventas:', error);
        res.status(500).send('Error al obtener las ventas');
    }
});

module.exports = router;