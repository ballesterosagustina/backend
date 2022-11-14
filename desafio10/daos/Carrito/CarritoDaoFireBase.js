import ContainerFirebase from "../../containers/ContainerFirebase.js";
import FirebaseAdmin from 'firebase-admin'; // Importamos la librería de Firebase

class carritoDaoFirebase extends ContainerFirebase {

    constructor() {
        super();
    }

    //! Listar productos de un carrito
    async listarProductos(id) {
        console.log('>>> ID to find: ', id);
        try {
            const db = FirebaseAdmin.firestore();
            const query = db.collection('carritos').doc(id);
            const snapshot = await query.get();
            const response = snapshot.data()
            return response;
        } catch (error) {
            console.log(error);
        }
    }

    //! Crear un carrito
    async crearCarrito(data) {
        const newCart = {
            timestamp: Date.now(),
            productos: [data]
        }

        try {
            const db = FirebaseAdmin.firestore();
            db.collection('carritos').add(newCart);;
            const response = newCart
            return response;
        } catch (error) {
            console.log(error);
        }

    }

    //! Agregar un producto al carrito
    async agregarProducto(id, data) {
        console.log('>>> ID to update: ', id);
        console.log('>>> Product to add: ', data);

        try {
            const db = FirebaseAdmin.firestore();
            const query = db.collection('carritos').doc(id);
            const snapshot = await query.get();
            const response = snapshot.data()
            response.productos.push(data)
            db.collection('carritos').doc(id).update(response);
            return response;
        } catch (error) {
            console.log(error);
        }
    }

    //! Eliminar un producto del carrito
    async eliminarProducto(id, codigo_producto) {
        console.log('>>> ID to update: ', id);
        console.log('>>> Product to delete: ', codigo_producto);

        try {
            const db = FirebaseAdmin.firestore();
            const query = db.collection('carritos').doc(id);
            const snapshot = await query.get();
            const response = snapshot.data()
            response.productos = response.productos.filter(producto => producto.codigo !== codigo_producto)
            db.collection('carritos').doc(id).update(response);
            return response;
        } catch (error) {
            console.log(error);
        }
    }


}

export default carritoDaoFirebase;