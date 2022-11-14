import express from 'express';
const router = express.Router();
import admin from '../admin.js';
import ProductosController from '../controller/ProductosController.js';

import indexDao from '../daos/index.js';

const collection = 'productos';

router.get('/', (req, res) => {
    try {
        indexDao({
            collection,
            verbo: 'get',
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

router.get('/:id', (req, res) => {
    const { id } = req.params;
    try {
        indexDao({
            collection,
            verbo: 'getById',
            id,
        }).then((producto) => {
            res.json(producto);
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: 'Error al listar el producto',
        });
    }
});

router.post('/', (req, res) => {
    if (admin) {
        try {
            indexDao({
                collection,
                verbo: 'post',
                data: req.body,
            }).then((producto) => {
                res.json(producto);
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({
                error: 'Error al guardar el producto',
            });
        }
    } else {
        res.status(401).json({
            error: 'No estas autorizado',
            descripcion: 'No estas autorizado para realizar esta accion ruta',
            ruta: '/productos',
            metodo: 'POST',
        });
    }
});

router.put('/:id', (req, res) => {
    const { id } = req.params;
    if (admin) {
        try {
            indexDao({
                collection,
                verbo: 'put',
                id,
                data: req.body,
            }).then((producto) => {
                res.json(producto);
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({
                error: 'Error al actualizar el producto',
            });
        }
    } else {
        res.status(401).json({
            error: 'No estas autorizado',
            descripcion: 'No estas autorizado para realizar esta accion ruta',
            ruta: '/productos',
            metodo: 'PUT',
        });
    }
});

router.delete('/:id', (req, res) => {
    const { id } = req.params;
    if (admin) {
        try {
            indexDao({
                collection,
                verbo: 'delete',
                id,
            }).then((producto) => {
                res.json(producto);
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({
                error: 'Error al borrar el producto',
            });
        }
    } else {
        res.status(401).json({
            error: 'No estas autorizado',
            descripcion: 'No estas autorizado para realizar esta accion ruta',
            ruta: '/productos',
            metodo: 'DELETE',
        });
    }
});

export default router;