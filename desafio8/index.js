const mysql2 = {
    client: 'mysql2',
    connection: {
        host: '127.0.0.1',
        port: 3306,
        user: 'root',
        password: '102030',
        database: 'coder_desafio_7'
    },
    pool: { min: 0, max: 7 },
};

const sqlite3 = {
    client: 'sqlite3',
    connection: { filename: './db/mydb.sqlite' }
};


const express = require('express');
const { Server: HttpServer } = require('http');
const { Server: SocketServer } = require('socket.io');
const path = require('path');
const productos = require('./router/productosRouter');


const {createTable, selectData, insertData} = require('./controller/DbController');

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
const messages = [];


try {
    createTable(mysql2 , 'productos', (table) => {
        table.increments('id').primary();
        table.string('nombre', 50).notNullable();
        table.float('precio').notNullable();
        table.string('miniatura').notNullable();
    });

    createTable(sqlite3 ,'chat', (table) => {
        table.increments('id').primary();
        table.string('email', 50).notNullable();
        table.string('hora').notNullable();
        table.string('msj').notNullable();
    });
} catch (error) {
    console.log(error.message);
}



const datos = {
    title: 'Coder House Web Sockets',
};

oi.on('connection', async (socket) => {


    selectData( mysql2 , 'productos').then((data) => {
        socket.emit('datos', {
            ...datos,
            productos: data,
        });
    });

    selectData( sqlite3 , 'chat').then((data) => {
        socket.emit('messages', data);
    });

    socket.on('disconnect', () => {
        console.log('Cliente desconectado', socket.id);
    });

    socket.on('producto_creado', (data) => {
        console.log('Datos recibidos del cliente', data);

        insertData(mysql2 ,'productos', data).then(() => {
            selectData(mysql2,'productos').then((data) => {
                oi.sockets.emit('datos', { ...datos, productos: data })
            })
        });
        ;
    });

    socket.on('msj', (data) => {
        console.log('Datos recibidos del cliente', data);

        insertData(sqlite3 ,'chat', { ...data, hora: new Date().toLocaleString('es-AR') }).then(() => {
            selectData(sqlite3,'chat').then((data) => {
                oi.sockets.emit('messages', data);
            })
        });

    });
});
