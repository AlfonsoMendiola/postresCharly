const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categorias = {
    values: ['Alimentos', 'Bebidas', 'Reposteria', 'OTROS'],
    message: '{VALUE} Alimento no valido'
}

const productoSchema = new Schema({
    registro: {type: Date, default: Date.now},
    nombre: {type: String, required: [true, 'Nombre obligatorio']},
    descripcion: {type: String, required: [true, 'Descripcion del producto obligatoria']},
    existencia: {type: Number, default: 0},
    costoUnitario: {type: Number, required: [true, 'Costo obligatorio']},
    precioUnitario: {type: Number, required: [true, 'Precio obligatorio']},
    image: {type: String, default: 'no_image'},
    categoria: {type: String, default: 'OTROS', enum: categorias},
});

export const Producto = mongoose.model('Producto', productoSchema);
