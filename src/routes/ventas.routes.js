import { Router } from 'express';
import { obtenerVentasConDetalles } from '../controllers/ventas.controller.js';

const router = Router();

// Ruta para obtener todos los usuarios.
router.get('/ventas', obtenerVentasConDetalles);

export default router;