const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');

const dbMedicos = require('./config/dbMedicos');

dotenv.config();

const app = express();

app.use(cors());

app.use(express.json());

const medicoRutas = require('./routes/medicoRutas');

app.use('/api/medicos', medicoRutas);

app.get('/', (req, res) => {
    res.send('Bienvenido API  Médicos (SQLite + MVC) de Uniminuto funcionando...');
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`API Medicos Uniminuto escuchando en el puerto ${PORT}`);
    console.log(`URL: http://localhost:${PORT}`);
    console.log('Bases de datos SQLite en: ./data/medicos.db');
});