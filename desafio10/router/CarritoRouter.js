import admin from '../admin.js';
import express from 'express';
const router = express.Router();

import indexDao from '../daos/index.js';

router.get('/:id/productos', (req, res) => {
    const { id } = req.params;
    try {
        indexDao({
            collection: 'carrito',
            verbo: 'get',
            id,
        }).then((productos) => {
            res.json(productos);
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: 'Error al listar los productos',
        });
    }
});

router.post('/', (req, res) => {
    const carrito = req.body;
    try {
        indexDao({
            collection: 'carrito',
            verbo: 'post',
            data: carrito,
        }).then((id) => {
            res.json({ id });
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: 'Error al guardar el carrito',
        });
    }
});

router.delete('/:id', (req, res) => {
    const { id } = req.params;

    try {
        indexDao({
            collection: 'carrito',
            verbo: 'delete',
            id,
        }).then((carrito) => {
            res.json(carrito);
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: 'Error al eliminar el carrito',
        });
    }
});

router.post('/:id/productos', (req, res) => {
    const { id } = req.params;
    const producto = req.body;
    try {
        indexDao({
            collection: 'carrito',
            verbo: 'agregarProducto',
            id,
            data: producto,
        }).then((carrito) => {
            res.json(carrito);
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: 'Error al agregar el producto al carrito',
        });
    }
});

router.delete('/:id/productos/:id_prod', (req, res) => {
    const { id, id_prod } = req.params;
    try {
        indexDao({
            collection: 'carrito',
            verbo: 'eliminarProducto',
            id,
            idProducto: id_prod,
        }).then((carrito) => {
            res.json(carrito);
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: 'Error al eliminar el producto del carrito',
        });
    }
});

export default router;