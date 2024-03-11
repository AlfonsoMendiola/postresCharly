import express from 'express';
import cors from 'cors';
import {mongoConnection} from './database/config.mjs';
import fileupload from 'express-fileupload';


import { noEncontradoRouter } from './api/no-encontrado/noEncontrado-router.mjs';
import { authRouter } from './api/auth/auth-router.mjs';
import { usuarioRouter } from './api/usuario/user-router.mjs';


class Servidor{
    constructor(){
        this.app = express();
        this.conectarMongo();
        this.middlewares();
        this.routes();
    }

    async conectarMongo(){ await mongoConnection(); }
    
    middlewares(){
        this.app.use( cors() );
        this.app.use( express.json() );
        this.app.use( express.urlencoded({extended: true}) );
        this.app.use( express.static('public') );
        this.app.use( fileupload({
            useTempFiles: true,
            tempFileDir: '/tmp/',
            createParentPath: true
        }) );
    }

    routes(){
        this.app.use('/api/auth', authRouter);
        this.app.use('/api/usuarios', usuarioRouter);
        
        this.app.use('/', noEncontradoRouter);
    }

    listen(){
        this.app.listen( process.env.APP_PORT, () => {
            console.log(`Corriendo en el puerto ${process.env.APP_PORT}`);
        } )
    }
}



const servidor = new Servidor();
servidor.listen();