import ProductosDaoArchivo from './productos/ProductosDaoArchivo.js';
import ProductosDaoMem from './productos/ProductosDaoMem.js';
import ProductosDaoMongo from './productos/ProductoDaoMongo.js';
import ProductosDaoFirebase from './productos/ProductoDaoFireBase.js';

import CarritoDaoArchivo from './carrito/CarritoDaoArchivo.js';
import CarritoDaoMem from './carrito/CarritoDaoMem.js';
import CarritoDaoMongo from './Carrito/CarritoDaoMongo.js';
import CarritoDaoFirebase from './Carrito/CarritoDaoFireBase.js';


import { v4 as uuidv4 } from 'uuid';
import FirebaseAdmin from 'firebase-admin';
import { readFile } from 'fs/promises'; // Importamos la

const CERT = await JSON.parse(
    await readFile(
        new URL(
            '../config/backendcoder-fc7ba-firebase-adminsdk-uyt05-0dbe5ac55a.json',
            import.meta.url
        )
    )
);


export const TypeDb = process.env.TYPE_OF_DB; //! Metodo de persistencia

let productosDaoFile;
let carritoDaoFile;

let productosDaoMem;
let carritoDaoMem;

let productosDaoMongo;
let carritoDaoMongo;

let productosDaoFirebase;
let carritoDaoFirebase;

function connectDataBase() {
    if (TypeDb === 'FILE') {
        console.log('Conectado con metodo de persistencia FILE');
        productosDaoFile = new ProductosDaoArchivo();
        carritoDaoFile = new CarritoDaoArchivo();
    }
    if (TypeDb === 'MEM') {
        console.log('Conectado con metodo de persistencia MEM');
        productosDaoMem = new ProductosDaoMem();
        carritoDaoMem = new CarritoDaoMem();
    }

    if (TypeDb === 'MONGO') {
        console.log('Conectado con metodo de persistencia MONGO');
        productosDaoMongo = new ProductosDaoMongo();
        carritoDaoMongo = new CarritoDaoMongo();
    }

    if (TypeDb === 'FIREBASE') {

        console.log('>>> Connecting to Firebase please wait...');

        FirebaseAdmin.initializeApp({
            credential: FirebaseAdmin.credential.cert(CERT)
        }).firestore()

        console.log('Conectado con metodo de persistencia FIREBASE');
        productosDaoFirebase = new ProductosDaoFirebase();
        carritoDaoFirebase = new CarritoDaoFirebase();
    }
}
connectDataBase();

function indexDao({ collection, verbo, id, data, idProducto }) {
    if (collection === 'productos') {
        switch (TypeDb) {
            case 'FILE':
                if (verbo === 'get') {
                    return productosDaoFile.readAllProductos();
                }
                if (verbo === 'getById') {
                    return productosDaoFile.readById(id);
                }
                if (verbo === 'post') {
                    return productosDaoFile.save(data);
                }
                if (verbo === 'put') {
                    return productosDaoFile.updateProductos(id, data);
                }
                if (verbo === 'delete') {
                    return productosDaoFile.deleteProductos(id);
                }
                break;

            case 'MEM':
                if (verbo === 'get') {
                    return productosDaoMem.readAllProductos();
                }
                if (verbo === 'getById') {
                    return productosDaoMem.readById(id);
                }
                if (verbo === 'post') {
                    return productosDaoMem.save(data);
                }
                if (verbo === 'put') {
                    return productosDaoMem.updateProductos(id, data);
                }
                if (verbo === 'delete') {
                    return productosDaoMem.deleteProductos(id);
                }

            case 'MONGO':
                if (verbo === 'get') {
                    return productosDaoMongo.readAllProductos();
                }
                if (verbo === 'getById') {
                    return productosDaoMongo.readById(id);
                }
                if (verbo === 'post') {
                    return productosDaoMongo.save(data);
                }
                if (verbo === 'put') {
                    return productosDaoMongo.update(id, data);
                }
                if (verbo === 'delete') {
                    return productosDaoMongo.delete(id);
                }

            case 'FIREBASE':
                if (verbo === 'get') {
                    return productosDaoFirebase.readAllProductos();
                }

                if (verbo === 'getById') {
                    return productosDaoFirebase.readById(id);
                }

                if (verbo === 'post') {
                    return productosDaoFirebase.save(data);
                }

                if (verbo === 'put') {
                    return productosDaoFirebase.update(id, data);
                }

                if (verbo === 'delete') {
                    return productosDaoFirebase.delete(id);
                }
        }
    }
    if (collection === 'carrito') {
        switch (TypeDb) {
            case 'FILE':
                if (verbo === 'get') {
                    console.log('get carrito');
                    return carritoDaoFile.listarProductos(id);
                }
                if (verbo === 'post') {
                    return carritoDaoFile.crearCarrito(data);
                }
                if (verbo === 'agregarProducto') {
                    return carritoDaoFile.agregarProducto(id, data);
                }
                if (verbo === 'eliminarProducto') {
                    return carritoDaoFile.eliminarProducto(id, idProducto);
                }
                if (verbo === 'delete') {
                    return carritoDaoFile.eliminarCarrito(id);
                }
                break;
            
            case 'MEM':
                if (verbo === 'get') {
                    console.log('get carrito');
                    return carritoDaoMem.listarProductos(id);
                }
                if (verbo === 'post') {
                    return carritoDaoMem.crearCarrito(data);
                }
                if (verbo === 'agregarProducto') {
                    return carritoDaoMem.agregarProducto(id, data);
                }
                if (verbo === 'eliminarProducto') {
                    return carritoDaoMem.eliminarProducto(id, idProducto);
                }
                if (verbo === 'delete') {
                    return carritoDaoMem.eliminarCarrito(id);
                }
            
            case 'MONGO':
                if (verbo === 'get') {
                    console.log('get carrito');
                    return carritoDaoMongo.listarProductos(id);
                }
                if (verbo === 'post') {
                    return carritoDaoMongo.crearCarrito(data);
                }
                if (verbo === 'agregarProducto') {
                    return carritoDaoMongo.agregarProducto(id, data);
                }
                if (verbo === 'eliminarProducto') {
                    return carritoDaoMongo.eliminarProducto(id, idProducto);
                }
                if (verbo === 'delete') {
                    return carritoDaoMongo.eliminarCarrito(id);
                }

            case 'FIREBASE':
                if (verbo === 'get') {
                    console.log('get carrito');
                    return carritoDaoFirebase.listarProductos(id);
                }
                if (verbo === 'post') {
                    return carritoDaoFirebase.crearCarrito(data);
                }
                if (verbo === 'agregarProducto') {
                    return carritoDaoFirebase.agregarProducto(id, data);
                }
                if (verbo === 'eliminarProducto') {
                    return carritoDaoFirebase.eliminarProducto(id, idProducto);
                }
                
        }
    }
}

export default indexDao;
