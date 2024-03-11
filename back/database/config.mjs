import mongoose from 'mongoose';

const mongoConnection = async() => {
    try {
        await mongoose.connect(`${process.env.MONGODB_SERVER}`);
        console.log('MongoDB en linea');
    } catch (error) {
        console.log(error);
        throw new Error('Error al conectar en mongoDB');
    }
}

export {mongoConnection}