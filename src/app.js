import express from 'express';
import rutasClientes from './routes/clientes.routes.js';
import rutasUsuarios from './routes/usuarios.routes.js';
import rutasProductos from './routes/productos.routes.js';
import rutasProveedor from './routes/proveedor.routes.js';

const app = express();

app.use(express.json());

app.use('/api', rutasClientes);
app.use('/api', rutasUsuarios);
app.use('/api', rutasProductos);
app.use('/api',rutasProveedor);

app.use((req, res, next)=>{
    res.status(404).json({
        message: 'La ruta que ha especificado no se encuentra registrada.'
    });
});

export default app;