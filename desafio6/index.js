const express = require('express');
const { Server: HttpServer } = require('http');
const { Server: SocketServer } = require('socket.io');
const path = require('path');
const productos = require('./router/productosRouter');
const ProductosController = require('./controller/controller');
const arrProductos = require('./model/arrProductos.json');

const port = process.env.PORT || 8080;
const app = express();
const httpServer = new HttpServer(app);

httpServer.listen(port, () => console.log(`Server running on port ${port}`));

const oi = new SocketServer(httpServer);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/', express.static(path.join(__dirname, 'public')));


app.use('/', productos);

let id = 0;
const users = [];
const messages = [];



const productosController = new ProductosController(arrProductos);
console.log('listar', productosController.listar());



const datos = {
    title: 'Coder House Web Sockets',
};


oi.on('connection', (socket) => {
    console.log('Nuevo cliente conectado!', socket.id);
    socket.emit('datos', {
        ...datos,
        productos: productosController.listar(arrProductos),
    });
    socket.emit('messages', messages);

    socket.on('disconnect', () => {
        console.log('Cliente desconectado', socket.id);
    });

    socket.on('producto_creado', (data) => {
        console.log('Datos recibidos del cliente', data);
        arrProductos.push({ ...data, id: ++id });
        oi.sockets.emit('datos', { ...datos, productos: productosController.listar(arrProductos) });
    });

    socket.on('msj', (data) => {
        console.log('Datos recibidos del cliente', data);
        messages.push({ ...data, hora: new Date().toLocaleString('es-AR') });
        oi.sockets.emit('messages', messages);
        console.log('Datos enviados al cliente', messages);
    });
});
