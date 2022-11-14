import mongoose, { Schema } from 'mongoose'; //! Importamos mongoose para usarlo y Schema para crear el esquema

/* 

"id": 2,
		"timestamp": "2021-06-29T20:00:00.000Z",
		"productos": [
			{
				"id": 2,
				"timestamp": "10/10/2022, 12:19:00 a. m.",
				"nombre": "Globo Terráqueo",
				"descripcion": "Observación de la Tierra",
				"codigo": "123",
				"foto": "https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png",
				"precio": 123,
				"stock": 10
			}
		]

*/

const carritoModel = new Schema(
    {
        timestamp: { type: Date, default: Date.now },
        productos: { type: Array, required: false },
    }

) 

export default mongoose.model('carritos', carritoModel); //! Exportamos el modelo con el nombre de la colección y el esquema