const PORT = process.env.PORT || 3000;

import express from 'express';
import path from 'path';
const app = express();
import bodyParser from 'body-parser';
import cors from 'cors';
import ProductosRouter from './router/ProductosRouter.js';
import CarritoRouter from './router/CarritoRouter.js';


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', express.static(path.join(import.meta.url, 'public')));

app.use('/api/productos', ProductosRouter);
app.use('/api/carrito', CarritoRouter);

app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

const server = app.listen(PORT, () => {
    console.log(
        `Servidor http esta escuchando en el puerto ${server.address().port}`
    );
});