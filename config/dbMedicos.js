const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const fs = require('fs');

const DB_DIR = path.resolve(__dirname, '../data');
const DB_PATH = path.join(DB_DIR, 'medicos.db');

if (!fs.existsSync(DB_DIR)) {
    fs.mkdirSync(DB_DIR);
}

const dbMedicos = new sqlite3.Database(DB_PATH, (err) => {
    if (err) {
        console.error('Error al conectar a la base de datos de Médicos (SQLite):', err.message);
    } else {
        console.log('Conectado a la base de datos de Médicos (SQLite): ' + DB_PATH);
        dbMedicos.serialize(() => {
            dbMedicos.run(`CREATE TABLE IF NOT EXISTS MEDICO (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                nombre TEXT NOT NULL,
                apellido TEXT NOT NULL,
                especialidad TEXT NOT NULL,
                licencia TEXT NOT NULL UNIQUE,
                telefono TEXT,
                email TEXT UNIQUE,
                createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
                updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
            );`, (err) => {
                if (err) {
                    console.error('Error al crear tabla de médicos:', err.message);
                } else {
                    console.log('Tabla DE médicos creada o ya existente.');
                }
            });
        });
    }
});

module.exports = dbMedicos;