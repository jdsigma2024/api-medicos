const MedicorService = require('../models/MedicoService');

const obtenerMedicos = (req, res) => {

    MedicorService.obtenerTodos(req.query, (err, doctors) => {
        if (err) {
            return res.status(500).json({ message: 'Error al obtener médicos', error: err.message });
        }
        res.status(200).json(doctors);
    });
};

const obtenerMedicoPorId = (req, res) => {
    
    MedicorService.obtenerPorID(req.params.id, (err, doctor) => {
        if (err) {
            return res.status(500).json({ message: 'Error al obtener médico', error: err.message });
        }
        if (!doctor) {
            return res.status(404).json({ message: 'Médico no encontrado' });
        }
        res.json(doctor);
    });
};

const crearMedico = (req, res) => {
    const { nombre, apellido, especialidad, licencia, telefono, email } = req.body;

    if (!nombre || !apellido || !especialidad || !licencia) {
        return res.status(400).json({ message: 'Por favor, ingrese todos los campos requeridos.' });
    }

  MedicorService.crear(req.body, (err, newDoctor) => {

        if (err) {
            if (err.message.includes('SQLITE_CONSTRAINT')) {
                return res.status(409).json({ message: 'Licencia o email ya existen.' });
            }
            return res.status(500).json({ message: 'Error al crear médico', error: err.message });
        }
        res.status(201).json(newDoctor);
    });
};

const actualizarMedico = (req, res) => {

    MedicorService.actualizar(req.params.id, req.body, (err, changes) => {

        if (err) {
            if (err.message.includes('SQLITE_CONSTRAINT')) {
                return res.status(409).json({ message: 'Licencia o email ya existen.' });
            }
            return res.status(500).json({ message: 'Error al actualizar médico', error: err.message });
        }
        if (changes === 0) {
            return res.status(404).json({ message: 'Médico no encontrado' });
        }
        res.json({ message: 'Médico actualizado' });
    });
};

const eliminarMedico = (req, res) => {

    MedicorService.eliminar(req.params.id, (err, changes) => {
        
        if (err) {
            return res.status(500).json({ message: 'Error al eliminar médico', error: err.message });
        }
        if (changes === 0) {
            return res.status(404).json({ message: 'Médico no encontrado' });
        }
        res.json({ message: 'Médico eliminado' });
    });
};

module.exports = {
    obtenerMedicos,
    obtenerMedicoPorId,
    crearMedico,
    actualizarMedico,
    eliminarMedico,
};

