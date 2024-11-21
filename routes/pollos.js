const express = require('express');
const router = express.Router();
const Pollo = require('../models/Pollo');

// Ruta para registrar un nuevo pollo
router.post('/nuevo', async (req, res) => {
    try {
        const nuevoPollo = new Pollo({
            peso: req.body.peso,
            fecha_nacimiento: req.body.fecha_nacimiento,
            raza: req.body.raza,
            estado_salud: req.body.estado_salud
        });
        await nuevoPollo.save();
        res.redirect('/'); // Redirige de vuelta a la página principal después de guardar
    } catch (error) {
        console.error('Error al registrar el pollo:', error); // Registrar el error en la consola
        res.status(500).send(`Error al registrar el pollo: ${error.message}`); // Mostrar el mensaje de error al usuario
    }
});

// Ruta para obtener todos los pollos
router.get('/todos', async (req, res) => {
    try {
        const pollos = await Pollo.find();
        res.json(pollos);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Ruta para eliminar un pollo por su ID
router.delete('/:id', async (req, res) => {
    try {
      const pollo = await Pollo.findByIdAndDelete(req.params.id);
      if (!pollo) {
        return res.status(404).json({ message: 'Pollo no encontrado' });
      }
      res.json({ message: 'Pollo eliminado correctamente' });
    } catch (error) {
      console.error('Error al eliminar el pollo:', error);
      res.status(500).json({ message: 'Error al eliminar el pollo' });
    }
  });

module.exports = router;
