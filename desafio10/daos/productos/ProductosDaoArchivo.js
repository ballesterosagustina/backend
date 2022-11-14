import { ContainerArchivo } from '../../containers/ContainerArchivo.js';
import { createRequire } from 'module';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const require = createRequire(import.meta.url);
const productosData = require('../../model/productosData.json');

class ProductosDaoArchivo extends ContainerArchivo {
    constructor() {
        super();
        this.productos = productosData;
    }

    //! Listar todo
    async readAllProductos() {
        return this.productos;
    }

    //! Listar por ID
    async readById(id) {
        return this.productos.filter((x) => x.id == id);
    }

    //! Agrergar un producto o carrito
    async save(producto) {
        const prod = {};

        console.log(producto);
        prod.id = this.productos.length + 1;
        prod.timestamp = new Date().toLocaleString();
        prod.nombre = producto.nombre;
        prod.descripcion = producto.descripcion;
        prod.codigo = producto.codigo;
        prod.foto = producto.foto;
        prod.precio = producto.precio;
        prod.stock = producto.stock;
        this.productos.push(prod);
        fs.writeFileSync(
            path.join(__dirname, '../../model/productosData.json'),
            JSON.stringify(this.productos, null, '\t')
        );

        return this.productos;
    }

    //! Actualizar un producto
    async updateProductos(id, prod) {
        this.productos.filter((producto) => {
            if (producto.id == id) {
                producto.nombre = prod.nombre;
                producto.descripcion = prod.descripcion;
                producto.codigo = prod.codigo;
                producto.foto = prod.foto;
                producto.precio = prod.precio;
                producto.stock = prod.stock;
            }
        });

        fs.writeFileSync(
            path.join(__dirname, '../../model/productosData.json'),
            JSON.stringify(this.productos, null, '\t')
        );

        return this.productos;
    }

    //! Borrar un producto
    async deleteProductos(id) {
        this.productos = this.productos.filter((producto) => producto.id != id);

        fs.writeFileSync(
            path.join(__dirname, '../../model/productosData.json'),
            JSON.stringify(this.productos, null, '\t')
        );

        return this.productos;
    }
}

export default ProductosDaoArchivo;
