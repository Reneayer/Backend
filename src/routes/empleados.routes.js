import { Router } from 'express';
import { obtenerEmpleados, obtenerEmpleado, registrarEmpleado } from '../controllers/empleados.controller.js';

const router = Router();

// Ruta para obtener todos los empleados
router.get('/empleados', obtenerEmpleados);

// Ruta para obtener un empleado por ID
router.get('/empleados/:id', obtenerEmpleado);

// Ruta para registrar un nuevo empleado
router.post('/empleados', registrarEmpleado);

export default router;