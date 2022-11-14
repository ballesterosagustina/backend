import ContainerFirebase from '../../containers/ContainerFirebase.js';
import FirebaseAdmin from 'firebase-admin'; // Importamos la librería de Firebase

class ProductosDaoFirebase extends ContainerFirebase {

    constructor() {
        super();
    }

    async readAllProductos() {
        const db = FirebaseAdmin.firestore();
        const query = db.collection('productos');
        const snapshot = await query.get();
        const response = snapshot.docs.map(doc => {
            return { id: doc.id, ...doc.data() };
        });
        console.log('Documentos de la colección productos', response);
        return response;
    }

    async readById(id) {
        console.log('id', id);
        const producto = await this.db.collection('productos').doc(id).get();
        console.log('producto', producto.data());
        return { id: producto.id, ...producto.data() };
    }

    async save(data) {
        const producto = await this.db.collection('productos').add(data);
        return { id: producto.id, ...data };
    }

    async update(id, data) {
        const producto = await this.db.collection('productos').doc(id).update(data);
        return { id: producto.id, ...data };
    }

    async delete(id) {
        const producto = await this.db.collection('productos').doc(id).delete();
        return producto;
    }

}

export default ProductosDaoFirebase;