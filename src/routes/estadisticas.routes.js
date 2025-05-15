import { Router } from 'express';
import {  totalVentasPorDia, totalVentasPorMes, totalVentasPorAnio, totalVentasPorEmpleado, cantidadDeVentasPorEmpleado, totalDeVentasPorEmpleadoyMes, analisisDeVentasPorCliente, cantidadComprasPorCliente,
   totalComprasClienteMes, totalComprasPorCliente, productosMasVendidosPorValor, 
   ventasProductosPorMes, productosMasVendidosPorCantidad, totalVentasPorCategoria,
   totalVentasPorCategoriaMes, productosBajoStock, stockPorCategoria, ventasClienteEmpleadoMes, ventasCategoriaEmpleadoMes } from '../controllers/estadisticas.controller.js';

const router = Router();

// Ruta para obtener todas las ventas
router.get('/totalventaspordia', totalVentasPorDia);
// Ruta para obtener todas las ventas por mes
router.get('/totalventaspormes', totalVentasPorMes);
// Ruta para obtener todas las ventas por mes
router.get('/totalventasporanio', totalVentasPorAnio);
// Ruta para obtener todas las ventas por mes
router.get('/totalventasporempleado', totalVentasPorEmpleado);
// Ruta para obtener todas las ventas por mes
router.get('/cantidaddeventasporempleado', cantidadDeVentasPorEmpleado);
// Ruta para obtener todas las ventas por mes
router.get('/totalventasporempleadoymes', totalDeVentasPorEmpleadoyMes);
// Ruta para obtener todas las ventas por mes
router.get('/analisisdeventasporcliente', analisisDeVentasPorCliente);
//
router.get('/comprasporcliente', cantidadComprasPorCliente);
//
router.get('/totalcomprasclientemes', totalComprasClienteMes);
//
router.get('/totalcomprasporcliente', totalComprasPorCliente);
//
router.get('/productosmasvendidosvalor', productosMasVendidosPorValor);
//
router.get('/ventasproductospormes', ventasProductosPorMes);
//
// 4.1 Productos más vendidos por cantidad
router.get('/productosmasvendidoscantidad', productosMasVendidosPorCantidad);

// 5.1 Total de ventas por categoría
router.get('/totalventaspocategoria', totalVentasPorCategoria);

// 5.2 Total de ventas por categoría y mes
router.get('/totalventaspocategoriaymes', totalVentasPorCategoriaMes);

// 10.1 Productos con bajo stock
router.get('/productosbajostock', productosBajoStock);

// 10.2 Stock por categoría
router.get('/stockporcategoria', stockPorCategoria);

// 11.1 Ventas por cliente, empleado y mes
router.get('/ventasclienteempleadomes', ventasClienteEmpleadoMes);

// 11.2 Ventas por categoría, empleado y mes
router.get('/ventascategoriaempleadomes', ventasCategoriaEmpleadoMes);

export default router;