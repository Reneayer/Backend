import { pool } from '../db.js';

// Obtener todos los clientes
export const obtenerClientes= async (req, res) => {
  try {
    const [result] = await pool.query('SELECT * FROM Clientes');
    res.json(result);
  } catch (error) {
    return res.status(500).json({
      mensaje: 'Ha ocurrido un error al leer los datos de los clientes.',
      error: error
    });
  }
};

// Obtener un cliente por su ID
export const obtenerCliente = async (req, res) => {
  try {
    const [result] = await pool.query('SELECT * FROM Clientes WHERE id_cliente = ?', [req.params.id]);
    
    if (result.length <= 0) {
      return res.status(404).json({
        mensaje: `Error al leer los datos. El ID ${req.params.id} del cliente no fue encontrado.`
      });
    }
    res.json(result[0]);
  } catch (error) {
    return res.status(500).json({
      mensaje: 'Ha ocurrido un error al leer los datos del cliente.'
    });
  }
};

// Registrar un nuevo cliente
export const registrarCliente = async (req, res) => {
  try {
    const { 
      primer_nombre, 
      segundo_nombre, 
      primer_apellido, 
      segundo_apellido, 
      celular, 
      direccion, 
      cedula 
    } = req.body;

    // Validación de campos requeridos
    if (!primer_nombre || !primer_apellido || !cedula || !celular) {
      return res.status(400).json({
        mensaje: 'Faltan campos requeridos: primer nombre, primer apellido, cédula o celular.'
      });
    }

    // Insertar cliente en la base de datos
    const [result] = await pool.query(
      'INSERT INTO clientes (primer_nombre, segundo_nombre, primer_apellido, segundo_apellido, celular, direccion, cedula) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [
        primer_nombre,
        segundo_nombre || null, // Opcional
        primer_apellido,
        segundo_apellido || null, // Opcional
        celular,
        direccion || null, // Opcional
        cedula
      ]
    );

    // Respuesta con éxito
    res.status(201).json({ 
      id_cliente: result.insertId,
      mensaje: 'Cliente registrado exitosamente'
    });

  } catch (error) {
    // Manejo de errores
    return res.status(500).json({
      mensaje: 'Ha ocurrido un error al registrar el cliente.',
      error: error.message
    });
  }
};
