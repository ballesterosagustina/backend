import mongoose, { Schema } from 'mongoose'; //! Importamos mongoose para usarlo y Schema para crear el esquema

const productoModel = new Schema(
    {
        nombre: { type: String, required: true },
        descripcion: { type: String, required: true },
        codigo: { type: String, required: true },
        foto: { type: String, required: true },
        precio: { type: Number, required: true },
        stock: { type: Number, required: true },
        timestamp: { type: Date, default: Date.now },
    }

) 

export default mongoose.model('productos', productoModel); //! Exportamos el modelo con el nombre de la colección y el esquema