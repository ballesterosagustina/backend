const fs = require('fs');
const path = require('path');


class ProductosController {
    constructor(productos) {
        this.productos = productos;
    }
    listar() {
        return this.productos;
    }
    listarPorId(id) {
        return this.productos.filter((producto) => producto.id == id);
    }
    guardar(producto) {
        //escritura en archivo json arrProductos.json
        this.productos.push(producto);
        console.log('productos--------', this.productos);
        fs.writeFileSync(path.join(__dirname, '../model/arrProductos.json'), JSON.stringify(this.productos, null, '\t'));
        
    }
    actualizar(id, producto) {
        this.productos = this.productos.map((producto) => {
            if (producto.id == id) {
                producto = producto;
            }
            return producto;
        });
    }
    borrar(id) {
        this.productos = this.productos.filter((producto) => producto.id != id);
    }

}


async function createTable(name, schema) {
    const knexInstance = knex(options);

    const exist = await knexInstance.schema.hasTable(name);
    if (exist) {
        console.log(`La tabla ${name} ya existe`);
        return;
    }

    try {
        await knexInstance.schema.createTable(name, schema);
        console.log(`Tabla ${name} creada`); 
    } catch (error) {
        console.log(error.message);
        throw error;
    } finally {
        knexInstance.destroy();
    }
}


module.exports = ProductosController;