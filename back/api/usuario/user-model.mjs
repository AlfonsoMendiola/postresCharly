import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const roles = {
    values: ['ADMIN', 'USER'],
    message: '{VALUE} Rol no valido'
}
const vistas ={
    values: ['total', 'empleados', 'adminInventario', 'adminUsuarios', 'tienda', 'principal'],
    message: '{VALUE} Vista no valida'
}

const userSchema = new Schema({
    nombre: {type: String, required: [true, 'El nombre es obligatorio']},
    email: {type: String, required:[true, 'Correo obligatorio'], unique: true},
    pass: {type: String, required:[true, 'La contraseña es necesaria']},
    date: {type: Date, default: Date.now},
    role: {type: String, default:'USER', enum: roles},
    vista:{type: String, default:'principal', enum: vistas},
    activo: {type: Boolean, default: true}
});

// Ocular la contraseña encriptada del ususario de la respuesta json
userSchema.methods.toJSON = function (){
    const obj = this.toObject();
    delete obj.pass;
    return obj;
}


export const User = mongoose.model('User', userSchema);
