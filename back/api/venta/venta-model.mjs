import mongoose from "mongoose";
const Schema = mongoose.Schema;

const ventaSchema = new Schema({
    date: {type: Date, default: Date.now},
    usuarioId: {type: String, required:[true,'El id del vendedor es obligarotio']},
    usuarioNombre: {type: String, required:[true,'El nombre del vendedor es obligarotio']},
    // array de productos y cantidades
    orden: {type: Array, required: [true, 'El carrito es obligatorio']},
    costoTotal: {type: Number, required:[true, 'El costo total es obligatorio']},
    precioTotal: {type: Number, required:[true, 'El costo total es obligatorio']},
    utilidad: {type: Number, required:[true, 'El costo total es obligatorio']}
})


export const Venta = mongoose.model('Venta', ventaSchema)




