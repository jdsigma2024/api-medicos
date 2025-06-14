const db = require('../config/dbMedicos');

const MedicorService = {

    obtenerTodos: (query, callback) => {
        let sql = "SELECT * FROM medico";
        let params = [];
        if (query.especialidad) {
            sql += " WHERE especialidad LIKE ?";
            params.push(`%${query.especialidad}%`);
        }
        db.all(sql, params, callback);
    },

    obtenerPorID: (id, callback) => {
        db.get("SELECT * FROM medico WHERE id = ?", [id], callback);
    },

    crear: (doctorData, callback) => {
        
        const { nombre, apellido, especialidad, licencia, telefono, email } = doctorData;
        
        db.run(`INSERT INTO medico (nombre, apellido, especialidad, licencia, telefono, email)
                VALUES (?, ?, ?, ?, ?, ?)`,
            [nombre, apellido, especialidad, licencia, telefono, email],
            function (err) {
                callback(err, { id: this.lastID, ...doctorData });
            }
        );
    },

    actualizar: (id, doctorData, callback) => {
        
        const { nombre, apellido, especialidad, licencia, telefono, email } = doctorData;
        
        db.run(`UPDATE medico SET
                nombre = COALESCE(?, nombre),
                apellido = COALESCE(?, apellido),
                especialidad = COALESCE(?, especialidad),
                licencia = COALESCE(?, licencia),
                telefono = COALESCE(?, telefono),
                email = COALESCE(?, email),
                updatedAt = CURRENT_TIMESTAMP
                WHERE id = ?`,
            [nombre, apellido, especialidad, licencia, telefono, email, id],
            function (err) {
                callback(err, this.changes);
            }
        );
    },

    eliminar: (id, callback) => {
        db.run("DELETE FROM medico WHERE id = ?", [id], function (err) {
            callback(err, this.changes);
        });
    }
};

module.exports = MedicorService;