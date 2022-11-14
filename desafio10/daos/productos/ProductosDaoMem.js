import { ContainerMem } from "../../containers/ContainerMem.js";

class ProductosDaoMem extends ContainerMem{ 

    async readAllProductos(){
        return this.productos;
    }

    async readById(id){
        const response = this.productos.find(producto => producto.id == id);
        if(response){
            return response;
        }
        return {error: 'producto no encontrado'};
    }

    async save(data){
        const id = this.productos.length + 1;
        const producto = {
            id: id,
            timestamp: Date.now(),
            nombre: data.nombre,
            descripcion: data.descripcion,
            codigo: data.codigo,
            foto: data.foto,
            precio: data.precio,
            stock: data.stock
        }
        this.productos.push(producto);
        return producto;
    }

    async updateProductos(id, data){
        const producto = this.productos.find(producto => producto.id == id);
        if(producto){
            producto.nombre = data.nombre;
            producto.descripcion = data.descripcion;
            producto.codigo = data.codigo;
            producto.foto = data.foto;
            producto.precio = data.precio;
            producto.stock = data.stock;
            return producto;
        }
        return {error: 'producto no encontrado'};
    }

    async deleteProductos(id){
        const producto = this.productos.find(producto => producto.id == id);
        if(producto){
            this.productos = this.productos.filter(producto => producto.id != id);
            return producto;
        }
        return {error: 'producto no encontrado'};
    }
    

}

export default ProductosDaoMem;