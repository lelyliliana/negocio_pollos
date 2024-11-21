const express = require('express');
const mongoose = require('mongoose');

// Inicializar la aplicación Express
const app = express(); 

// Middleware para procesar datos de formularios
app.use(express.urlencoded({ extended: true })); 

app.use(express.json());
app.use(express.static('public'));

// Conectar a MongoDB
mongoose.connect('mongodb://localhost:27017/negocio_pollos', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Conectado a MongoDB'))
.catch((error) => console.error('Error al conectar a MongoDB:', error));

// Rutas de API
const pollosRouter = require('./routes/pollos');
const ventasRouter = require('./routes/ventas');
app.use('/pollos', pollosRouter);
app.use('/ventas', ventasRouter);

// Iniciar el servidor
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});