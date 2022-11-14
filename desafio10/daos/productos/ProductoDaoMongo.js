import { ContainerMongo } from "../../containers/ContainerMongo.js";
import productoModel from '../../model/productoModel.js';

class ProductosDaoMongo extends ContainerMongo {

    constructor() {
        super();
    }

    async readAllProductos() {
        try {
            const result = await productoModel.find();
            console.log('>>> Products found: ', result);
            return result;
        } catch (error) {
            console.log(error);
        }
    }

    async readById(id) {
        try {
            const result = await productoModel.find({ _id: id });
            console.log('>>> Product found: ', result);
            return result;
        } catch (error) {
            console.log(error);
        }
    }

    async save(producto) {
        try {
            const prod = new productoModel(producto);
            const result = await prod.save();
            console.log('>>> Product saved: ', result);
            return result;
        } catch (error) {
            console.log(error);
        }
    }

    async update(id, prod) {
        console.log('>>> ID to update: ', id);
        console.log('>>> Product to update: ', prod);

        try {
            const result = await productoModel.updateOne({ _id: id }, prod);
            console.log('>>> Product updated: ', result);
            return result;
        } catch (error) {
            console.log(error);
        }
    }

    async delete(id) {
        try {
            const result = await productoModel.deleteOne({ _id: id });
            console.log('>>> Product deleted: ', result);
            return result;
        } catch (error) {
            console.log(error);
        }
    }


}

export default ProductosDaoMongo