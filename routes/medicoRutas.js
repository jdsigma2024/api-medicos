const express = require('express');

const {
    obtenerMedicos,
    obtenerMedicoPorId,
    crearMedico,
    actualizarMedico,
    eliminarMedico
} = require('../controllers/medicoController');

const router = express.Router();

router.get('/', obtenerMedicos);
router.get('/:id', obtenerMedicoPorId);
router.post('/', crearMedico); 
router.put('/:id', actualizarMedico);
router.delete('/:id', eliminarMedico);

module.exports = router;