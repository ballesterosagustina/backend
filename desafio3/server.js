const express = require('express');
const {Contenedor} = require('./contenedor');

const app = express();

const contenedor = new Contenedor('./productos.txt');
let productos = []
const PORT = 8080

const listener = app.listen(PORT, () => {
  console.log(`Your app is listening on port ${PORT}`);
});

app.get('/', (req,res)=>{
    res.send(`<h1>Desafio 3 - Servidor con Express</h1>`)
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
