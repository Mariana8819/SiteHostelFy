const express = require('express');
const mongoose = require('mongoose');
const dotenv =require('dotenv');
const cors = require('cors');
const huespedRoutes = require('./routes/huespedRoutes');
const empleadoRoutes = require('./routes/empleadoRoutes');
const habitacionRoutes = require('./routes/habitacionRoutes');
const reservasRoutes = require('./routes/reservaRoutes');

//Cragar variables de entorno
dotenv.config();

//Configurar Express
const app = express();
app.use(cors());
app.use(express.json());

//Conectar a MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('Conectado a MongoDB'))
.catch((err) => console.error('Error conectando a MongoDB:', err));

//Rutas
app.use('/api/empleados', empleadoRoutes);
app.use('/api/habitaciones', habitacionRoutes);
app.use('/api/huespedes', huespedRoutes);
app.use('/api/reservas',reservasRoutes );

//Manejo de errores
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Algo salió mal en el servidor' });
});

//Iniciar el servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`))