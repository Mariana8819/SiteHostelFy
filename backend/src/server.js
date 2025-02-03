const express = require('express');
const mongoose = require('mongoose');
const dotenv =require('dotenv');
const cors = require('cors');
const huespedRoutes = require('./routes/huespedRoutes');
const empleadoRoutes = require('./routes/empleadoRoutes');
const habitacionRoutes = require('./routes/habitacionRoutes');
const reservasRoutes = require('./routes/reservaRoutes');
const usuarioRoutes = require('./routes/usuarioRoutes');

//Cragar variables de entorno
dotenv.config();

//Configurar Express
const app = express();

const corsOptions = {
    origin: 'http://localhost:5173',  // El origen específico de tu frontend
    credentials: true,               // Permite el uso de credenciales como cookies y cabeceras de autenticación
  };
  app.use(cors(corsOptions));

//app.use(cors());
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
app.use('/api/usuarios', usuarioRoutes);

//Manejo de errores
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Algo salió mal en el servidor' });
});

//Iniciar el servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`))