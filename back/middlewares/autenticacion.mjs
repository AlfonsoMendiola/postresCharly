import jwt from "jsonwebtoken";
import { User } from "../api/usuario/user-model.mjs";


const verificarAuth = async(req, res, next) =>{
    try {
        if (!req.header('authorization')) return res.status(401).json({error: 'Bearer Token obligatorio'});
        const token = req.header('authorization').split(' ')[1];
        const usuarioToken = jwt.verify(token, process.env.SECRETO_PRIVATEKEY);
    
        const usuario = await User.findByPk(usuarioToken._id);
        if(!usuario) return res.status(401).json({error: 'El usuario no existe'});
        req.usuarioToken = usuario;
    
        next();
        
    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
    
}

const verificarAdministrador = (req, res, next) => {
    try {
        const rol = req.usuarioToken.role;
        if(rol === 'ADMIN'){
            next();
        }else{
            return res.status(401).json({mensaje: 'Usuario no valido'})
        }
        
    } catch (error) {
        console.log(error);
        return res.status(500).json(error);

    }
}

export {verificarAuth, verificarAdministrador}