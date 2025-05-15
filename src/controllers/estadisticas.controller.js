import { pool2 } from '../db.js';

// Obtener el Total de ventas por día
export const totalVentasPorDia = async (req, res) => {
  try {
    const [result] = await pool2.query(
      ` SELECT DATE_FORMAT(t.fecha, '%Y-%m-%d') AS dia, ROUND(SUM(hv.total_linea),2) AS total_ventas
        FROM Hecho_Ventas hv
        JOIN Dim_Tiempo t ON hv.fecha = t.fecha
        GROUP BY t.fecha
        ORDER BY t.fecha; `
    );
    if (result.length === 0) {
      return res.status(404).json({
        mensaje: 'No se encontraron estadisticas de ventas.',
      });
    }
    res.json(result);
  } catch (error) {
    return res.status(500).json({
      mensaje: 'Ha ocurrido un error al obtener  las estadisticas de ventas.',
      error: error.message,
    });
  }
};

// Obtener el Total de ventas por día
export const totalVentasPorMes = async (req, res) => {
  try {
    const [result] = await pool2.query(
      ` SELECT t.mes, ROUND(SUM(hv.total_linea),1) AS total_ventas
        FROM Hecho_Ventas hv
        JOIN Dim_Tiempo t ON hv.fecha = t.fecha
        GROUP BY t.mes
        ORDER BY t.mes;`
    );
    if (result.length === 0) {
      return res.status(404).json({
        mensaje: 'No se encontraron estadisticas de ventas.',
      });
    }
    res.json(result);
  } catch (error) {
    return res.status(500).json({
      mensaje: 'Ha ocurrido un error al obtener  las estadisticas de ventas.',
      error: error.message,
    });
  }
};

// Obtener el Total de ventas por anio
export const totalVentasPorAnio = async (req, res) => {
  try {
    const [result] = await pool2.query(
      ` SELECT t.año, ROUND(SUM(hv.total_linea), 2) AS total_ventas
        FROM Hecho_Ventas hv
        JOIN Dim_Tiempo t ON hv.fecha = t.fecha
        GROUP BY t.año
        ORDER BY t.año; `
    );
    if (result.length === 0) {
      return res.status(404).json({
        mensaje: 'No se encontraron estadisticas de ventas.',
      });
    }
    res.json(result);
  } catch (error) {
    return res.status(500).json({
      mensaje: 'Ha ocurrido un error al obtener  las estadisticas de ventas.',
      error: error.message,
    });
  }
};

// Obtener el Total de ventas por empleado
export const totalVentasPorEmpleado = async (req, res) => {
  try {
    const [result] = await pool2.query(
      ` SELECT e.primer_nombre, e.segundo_nombre, e.primer_apellido, ROUND(SUM(hv.total_linea),2) AS total_ventas
        FROM Hecho_Ventas hv
        JOIN Dim_Empleados e ON hv.id_empleado = e.id_empleado
        GROUP BY e.id_empleado, e.primer_nombre, e.segundo_nombre, e.primer_apellido
        ORDER BY total_ventas DESC; `
    );
    if (result.length === 0) {
      return res.status(404).json({
        mensaje: 'No se encontraron estadisticas de ventas por empleados.',
      });
    }
    res.json(result);
  } catch (error) {
    return res.status(500).json({
      mensaje: 'Ha ocurrido un error al obtener las estadisticas de ventas por empleados.',
      error: error.message,
    });
  }
};

// Cantidad de ventas por empleado
export const cantidadDeVentasPorEmpleado= async (req, res) => {
  try {
    const [result] = await pool2.query(
      ` SELECT e.primer_nombre, e.segundo_nombre, e.primer_apellido, COUNT(DISTINCT hv.id_venta) AS cantidad_ventas
        FROM Hecho_Ventas hv
        JOIN Dim_Empleados e ON hv.id_empleado = e.id_empleado
        GROUP BY e.id_empleado, e.primer_nombre, e.segundo_nombre, e.primer_apellido
        ORDER BY cantidad_ventas DESC; `
    );
    if (result.length === 0) {
      return res.status(404).json({
        mensaje: 'No se encontro la cantidad de ventas por empleado.',
      });
    }
    res.json(result);
  } catch (error) {
    return res.status(500).json({
      mensaje: 'Ha ocurrido un error al obtener la cantidad de ventas por empleado.',
      error: error.message,
    });
  }
};

// Cantidad de ventas por empleado
export const totalDeVentasPorEmpleadoyMes= async (req, res) => {
  try {
    const [result] = await pool2.query(
      ` SELECT e.primer_nombre, e.segundo_nombre, e.primer_apellido, t.año, t.mes, SUM(hv.total_linea) AS total_ventas
        FROM Hecho_Ventas hv
        JOIN Dim_Empleados e ON hv.id_empleado = e.id_empleado
        JOIN Dim_Tiempo t ON hv.fecha = t.fecha 
        GROUP BY e.id_empleado, e.primer_nombre, e.segundo_nombre, e.primer_apellido, t.año, t.mes
        ORDER BY t.año, t.mes, total_ventas DESC; `
    );
    if (result.length === 0) {
      return res.status(404).json({
        mensaje: 'No se encontro la cantidad de ventas por empleado y mes.',
      });
    }
    res.json(result);
  } catch (error) {
    return res.status(500).json({
      mensaje: 'Ha ocurrido un error al obtener la cantidad de ventas por empleado y mes.',
      error: error.message,
    });
  }
};

// Cantidad de ventas por empleado
export const analisisDeVentasPorCliente= async (req, res) => {
  try {
    const [result] = await pool2.query(
      ` SELECT c.primer_nombre, c.segundo_nombre, c.primer_apellido, ROUND(SUM(hv.total_linea),2) AS total_compras
        FROM Hecho_Ventas hv
        JOIN Dim_Clientes c ON hv.id_cliente = c.id_cliente
        GROUP BY c.id_cliente, c.primer_nombre, c.segundo_nombre, c.primer_apellido
        ORDER BY total_compras DESC; `
    );
    if (result.length === 0) {
      return res.status(404).json({
        mensaje: 'No se realizo el analisis de ventas por cliente.',
      });
    }
    res.json(result);
  } catch (error) {
    return res.status(500).json({
      mensaje: 'Ha ocurrido un error al analizar las ventas por cliente.',
      error: error.message,
    });
  }
};

// Ejemplo de estructura para consultas SQL en el backend con Express y MySQL

// 3.2 Cantidad de compras por cliente
export const cantidadComprasPorCliente = async (req, res) => {
  try {
    const [result] = await pool2.query(
      `SELECT c.primer_nombre, c.segundo_nombre, c.primer_apellido, COUNT(DISTINCT hv.id_venta) AS cantidad_compras
       FROM Hecho_Ventas hv
       JOIN Dim_Clientes c ON hv.id_cliente = c.id_cliente
       GROUP BY c.id_cliente, c.primer_nombre, c.segundo_nombre, c.primer_apellido
       ORDER BY cantidad_compras DESC;`
    );
    if (result.length === 0) {
      return res.status(404).json({ mensaje: 'No se encontraron compras por cliente.' });
    }
    res.json(result);
  } catch (error) {
    return res.status(500).json({ mensaje: 'Error al obtener las compras por cliente.', error: error.message });
  }
};

// 3.3 Total de compras por cliente y mes
export const totalComprasClienteMes = async (req, res) => {
  try {
    const [result] = await pool2.query(
      `SELECT c.primer_nombre, c.segundo_nombre, c.primer_apellido, t.año, t.mes, SUM(hv.total_linea) AS total_compras
       FROM Hecho_Ventas hv
       JOIN Dim_Clientes c ON hv.id_cliente = c.id_cliente
       JOIN Dim_Tiempo t ON hv.fecha = t.fecha
       GROUP BY c.id_cliente, c.primer_nombre, c.segundo_nombre, c.primer_apellido, t.año, t.mes
       ORDER BY t.año, t.mes, total_compras DESC;`
    );
    if (result.length === 0) {
      return res.status(404).json({ mensaje: 'No se encontraron compras por cliente y mes.' });
    }
    res.json(result);
  } catch (error) {
    return res.status(500).json({ mensaje: 'Error al obtener las compras por cliente y mes.', error: error.message });
  }
};

// 4.1 Total de compras por cliente (valor total)
export const totalComprasPorCliente = async (req, res) => {
  try {
    const [result] = await pool2.query(
      `SELECT c.primer_nombre, c.segundo_nombre, c.primer_apellido, ROUND(SUM(hv.total_linea),2) AS total_compras
       FROM Hecho_Ventas hv
       JOIN Dim_Clientes c ON hv.id_cliente = c.id_cliente
       GROUP BY c.id_cliente, c.primer_nombre, c.segundo_nombre, c.primer_apellido
       ORDER BY total_compras DESC;`
    );
    if (result.length === 0) {
      return res.status(404).json({ mensaje: 'No se encontraron datos de compras por cliente.' });
    }
    res.json(result);
  } catch (error) {
    return res.status(500).json({ mensaje: 'Error al obtener total de compras por cliente.', error: error.message });
  }
};

// 4.2 Productos más vendidos por valor total
export const productosMasVendidosPorValor = async (req, res) => {
  try {
    const [result] = await pool2.query(
      `SELECT p.nombre_producto, SUM(hv.total_linea) AS total_ventas, SUM(hv.cantidad) AS cantidad_vendida
       FROM Hecho_Ventas hv
       JOIN Dim_Productos p ON hv.id_producto = p.id_producto
       GROUP BY p.id_producto, p.nombre_producto
       ORDER BY total_ventas DESC;`
    );
    if (result.length === 0) {
      return res.status(404).json({ mensaje: 'No se encontraron ventas por producto.' });
    }
    res.json(result);
  } catch (error) {
    return res.status(500).json({ mensaje: 'Error al obtener productos más vendidos por valor.', error: error.message });
  }
};

// 4.3 Ventas de productos por mes
export const ventasProductosPorMes = async (req, res) => {
  try {
    const [result] = await pool2.query(
      `SELECT p.nombre_producto, t.año, t.mes, SUM(hv.cantidad) AS cantidad_vendida, SUM(hv.total_linea) AS total_ventas
       FROM Hecho_Ventas hv
       JOIN Dim_Productos p ON hv.id_producto = p.id_producto
       JOIN Dim_Tiempo t ON hv.fecha = t.fecha
       GROUP BY p.id_producto, p.nombre_producto, t.año, t.mes
       ORDER BY t.año, t.mes, total_ventas DESC;`
    );
    if (result.length === 0) {
      return res.status(404).json({ mensaje: 'No se encontraron ventas de productos por mes.' });
    }
    res.json(result);
  } catch (error) {
    return res.status(500).json({ mensaje: 'Error al obtener ventas de productos por mes.', error: error.message });
  }
};

// 4.1 Productos más vendidos por cantidad
export const productosMasVendidosPorCantidad = async (req, res) => {
  try {
    const [result] = await pool2.query(
      `SELECT p.nombre_producto, SUM(hv.cantidad) AS cantidad_vendida
       FROM Hecho_Ventas hv
       JOIN Dim_Productos p ON hv.id_producto = p.id_producto
       GROUP BY p.id_producto, p.nombre_producto
       ORDER BY cantidad_vendida DESC;`
    );
    if (result.length === 0) {
      return res.status(404).json({ mensaje: 'No se encontraron productos más vendidos por cantidad.' });
    }
    res.json(result);
  } catch (error) {
    return res.status(500).json({ mensaje: 'Error al obtener productos más vendidos por cantidad.', error: error.message });
  }
};

// 5.1 Total de ventas por categoría
export const totalVentasPorCategoria = async (req, res) => {
  try {
    const [result] = await pool2.query(
      `SELECT p.nombre_categoria, SUM(hv.total_linea) AS total_ventas, SUM(hv.cantidad) AS cantidad_vendida
       FROM Hecho_Ventas hv
       JOIN Dim_Productos p ON hv.id_producto = p.id_producto
       GROUP BY p.nombre_categoria
       ORDER BY total_ventas DESC;`
    );
    if (result.length === 0) {
      return res.status(404).json({ mensaje: 'No se encontraron ventas por categoría.' });
    }
    res.json(result);
  } catch (error) {
    return res.status(500).json({ mensaje: 'Error al obtener ventas por categoría.', error: error.message });
  }
};

// 5.2 Total de ventas por categoría y mes
export const totalVentasPorCategoriaMes = async (req, res) => {
  try {
    const [result] = await pool2.query(
      `SELECT p.nombre_categoria, t.año, t.mes, SUM(hv.total_linea) AS total_ventas, SUM(hv.cantidad) AS cantidad_vendida
       FROM Hecho_Ventas hv
       JOIN Dim_Productos p ON hv.id_producto = p.id_producto
       JOIN Dim_Tiempo t ON hv.fecha = t.fecha
       GROUP BY p.nombre_categoria, t.año, t.mes
       ORDER BY t.año, t.mes, total_ventas DESC;`
    );
    if (result.length === 0) {
      return res.status(404).json({ mensaje: 'No se encontraron ventas por categoría y mes.' });
    }
    res.json(result);
  } catch (error) {
    return res.status(500).json({ mensaje: 'Error al obtener ventas por categoría y mes.', error: error.message });
  }
};

// 10.1 Productos con bajo stock
export const productosBajoStock = async (req, res) => {
  try {
    const [result] = await pool2.query(
      `SELECT p.nombre_producto, p.stock
       FROM Dim_Productos p
       WHERE p.stock < 50
       ORDER BY p.stock ASC;`
    );
    if (result.length === 0) {
      return res.status(404).json({ mensaje: 'No se encontraron productos con bajo stock.' });
    }
    res.json(result);
  } catch (error) {
    return res.status(500).json({ mensaje: 'Error al obtener productos con bajo stock.', error: error.message });
  }
};

// 10.2 Stock por categoría
export const stockPorCategoria = async (req, res) => {
  try {
    const [result] = await pool2.query(
      `SELECT p.nombre_categoria, SUM(p.stock) AS stock_total
       FROM Dim_Productos p
       GROUP BY p.nombre_categoria
       ORDER BY stock_total DESC;`
    );
    if (result.length === 0) {
      return res.status(404).json({ mensaje: 'No se encontró stock por categoría.' });
    }
    res.json(result);
  } catch (error) {
    return res.status(500).json({ mensaje: 'Error al obtener stock por categoría.', error: error.message });
  }
};

// 11.1 Ventas por cliente, empleado y mes
export const ventasClienteEmpleadoMes = async (req, res) => {
  try {
    const [result] = await pool2.query(
      `SELECT c.primer_nombre AS cliente_nombre, c.primer_apellido AS cliente_apellido,
              e.primer_nombre AS empleado_nombre, e.primer_apellido AS empleado_apellido,
              t.año, t.mes, SUM(hv.total_linea) AS total_ventas
       FROM Hecho_Ventas hv
       JOIN Dim_Clientes c ON hv.id_cliente = c.id_cliente
       JOIN Dim_Empleados e ON hv.id_empleado = e.id_empleado
       JOIN Dim_Tiempo t ON hv.fecha = t.fecha
       GROUP BY c.id_cliente, c.primer_nombre, c.primer_apellido,
                e.id_empleado, e.primer_nombre, e.primer_apellido,
                t.año, t.mes
       ORDER BY t.año, t.mes, total_ventas DESC;`
    );
    if (result.length === 0) {
      return res.status(404).json({ mensaje: 'No se encontraron ventas por cliente, empleado y mes.' });
    }
    res.json(result);
  } catch (error) {
    return res.status(500).json({ mensaje: 'Error al obtener ventas por cliente, empleado y mes.', error: error.message });
  }
};

// 11.2 Ventas por categoría, empleado y mes
export const ventasCategoriaEmpleadoMes = async (req, res) => {
  try {
    const [result] = await pool2.query(
      `SELECT p.nombre_categoria, e.primer_nombre AS empleado_nombre, e.primer_apellido AS empleado_apellido,
              t.año, t.mes, SUM(hv.total_linea) AS total_ventas
       FROM Hecho_Ventas hv
       JOIN Dim_Productos p ON hv.id_producto = p.id_producto
       JOIN Dim_Empleados e ON hv.id_empleado = e.id_empleado
       JOIN Dim_Tiempo t ON hv.fecha = t.fecha
       GROUP BY p.nombre_categoria, e.id_empleado, e.primer_nombre, e.primer_apellido,
                t.año, t.mes
       ORDER BY t.año, t.mes, total_ventas DESC;`
    );
    if (result.length === 0) {
      return res.status(404).json({ mensaje: 'No se encontraron ventas por categoría, empleado y mes.' });
    }
    res.json(result);
  } catch (error) {
    return res.status(500).json({ mensaje: 'Error al obtener ventas por categoría, empleado y mes.', error: error.message });
  }
};
