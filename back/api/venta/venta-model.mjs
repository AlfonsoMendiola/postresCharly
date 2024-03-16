import mongoose from "mongoose";
const Schema = mongoose.Schema;

const ventaSchema = new Schema({
    date: {type: Date, default: Date.now},
    id_user: {type: Schema.Types.ObjectId, ref:'User', required:[true,'El id del vendedor es obligarotio']},
    orden:[{
        id_producto: { type: Schema.Types.ObjectId, ref: 'Producto', required:[true,'El id del producto es obligarotio'] },
        cantidad: {type: Number, required:[true, 'la cantidad es obligatoria']},
        costoSubTotal: {type: Number, required:[true, 'la cantidad es obligatoria']},
        precioSubTotal: {type: Number, required:[true, 'la cantidad es obligatoria']}
    }],
    costoTotal: {type: Number, required:[true, 'El costo total es obligatorio']},
    precioTotal: {type: Number, required:[true, 'El precio total es obligatorio']},
    utilidad: {type: Number, required:[true, 'calcular utilidad']}
})


export const Venta = mongoose.model('Venta', ventaSchema);




