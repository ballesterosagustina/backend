import { ContainerMongo } from "../../containers/ContainerMongo.js";
import carritoModel from "../../model/carritoModel.js";

class CarritoDaoMongo extends ContainerMongo {

    //! Listar productos de un carrito
    async listarProductos(id) {
        console.log('>>> ID to find: ', id);
        try {
            const result = await carritoModel.findOne({ _id: id });
            console.log('>>> Products found: ', result);
            return result;
        } catch (error) {
            console.log(error);
        }
    }

    //! Crear un carrito
    async crearCarrito(carrito) {
        const newCart = {
            timestamp: Date.now(),
            productos: [carrito]
        }

        try {
            const result = await carritoModel.create(newCart);
            console.log('>>> Cart created: ', result);
            return result;
        } catch (error) {
            console.log(error);
        }
    }

    //! Agregar un producto al carrito
    async agregarProducto(id, producto) {
        console.log('>>> ID to update: ', id);
        console.log('>>> Product to add: ', producto);

        try {
            const result = await carritoModel.updateOne({ _id: id }, { $push: { productos: producto } });
            console.log('>>> Product added: ', result);
            return result;
        } catch (error) {
            console.log(error);
        }
    }

    //! Eliminar un producto del carrito
    async eliminarProducto(id, codigo) {
        console.log('>>> ID to update: ', id);
        console.log('>>> Product to delete: ', codigo);

        try {
            const result = await carritoModel.updateOne({ _id: id }, { $pull: { productos: { codigo: codigo } } });
            console.log('>>> Product deleted: ', result);
            return result;
        } catch (error) {
            console.log(error);
        }
    }

    //! Eliminar un carrito
    async eliminarCarrito(id) {
        try {
            const result = await carritoModel.deleteOne({ _id: id });
            console.log('>>> Cart deleted: ', result);
            return result;
        } catch (error) {
            console.log(error);
        }
    }

}

export default CarritoDaoMongo;