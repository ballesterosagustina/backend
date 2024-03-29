const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const productos = require('./router/productosRouter');

const app = express();
app.use(bodyParser.json());

const PORT = process.env.PORT;
const ENV = process.env.NODE_ENV;

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', productos);

app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

const server = app.listen(PORT, () => {
    console.log(
        `Servidor http esta escuchando en el puerto ${server.address().port}`
    );
    console.log(`http://localhost:${server.address().port}`);
    console.log(`Environment:${ENV}`);
});

server.on('error', (error) => console.log(`Error en servidor ${error}`));
