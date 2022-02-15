const express = require('express');
const {Contenedor} = require('./src/contenedor');

const app = express();

const contenedor = new Contenedor('./src/productos.txt');
let productos = []

const server = app.listen(8080, ()=>{
    console.log('Listening on port 8080')
})

app.get('/', (req,res)=>{
    res.send('<h1>Desafio 3 - Servidor con Express</h1>')
})
app.get('/productos', async (req, res)=>{
    productos = await contenedor.getAll();
    res.send(`<h2>Listado de productos</h2> ${JSON.stringify(productos)}`)
})
app.get('/productoRandom', async (req, res)=>{
    productos = await contenedor.getAll();
    const item = productos[Math.random()*productos.length | 0]
    res.send(`<h2>Producto random</h2> ${JSON.stringify(item)}`)
})