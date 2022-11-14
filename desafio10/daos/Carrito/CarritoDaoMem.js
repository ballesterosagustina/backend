import { ContainerMem } from '../../containers/ContainerMem.js';

class CarritoDaoMem extends ContainerMem {
    //! Listar productos de un carrito
    async listarProductos(id) {
        let productos;
        this.carritos.forEach((carrito) => {
            if (carrito.id == id) {
                productos = carrito.productos;
            }
        });
        return productos;
    }

    //! Crear un carrito
    async crearCarrito(carritoData) {
        carritoData.id = 1;
        carritoData.timestamp = new Date().toLocaleString();

        const carrito = {
            id: this.carritos.length + 1,
            timestamp: new Date().toLocaleString(),
            /* agregar id y timestamp */
            productos: [
                {
                    id: 1,
                    timestamp: new Date().toLocaleString(),
                    ...carritoData,
                },
            ],
        };

        this.carritos.push(carrito);
        return carrito.id;
    }

    //! Agregar un producto a un carrito
    async agregarProducto(id, productoData) {
        let carrito;
        this.carritos.forEach((carrito) => {
            if (carrito.id == id) {
                productoData.id = carrito.productos.length + 1;
                productoData.timestamp = new Date().toLocaleString();
                carrito.productos.push(productoData);
            }
        });
        return carrito;
    }

    //! Eliminar un producto de un carrito
    async eliminarProducto(id, idProducto) {
        let carrito;
        this.carritos.forEach((carrito) => {
            if (carrito.id == id) {
                carrito.productos = carrito.productos.filter(
                    (producto) => producto.id != idProducto
                );
            }
        });
        return carrito;
    }

    //! Eliminar un carrito
    async eliminarCarrito(id) {
        this.carritos = this.carritos.filter((carrito) => carrito.id != id);
        return this.carritos;
    }
}

export default CarritoDaoMem;
