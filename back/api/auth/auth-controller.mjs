import bcrypt from 'bcrypt'

import { generarJWT } from '../../helpers/generar-jwt.mjs'

import { User } from '../usuario/user-model.mjs';

export const authController = {
    login: async(req, res) => {
        try {
            const {email, pass} = req.body;
            const usuario = await User.findOne( { where:{email} } ).exec();
            if (!usuario) return res.status(404).json({error: 'Registrate para iniciar sesion'});

            const validPass = bcrypt.compareSync(pass, usuario.pass);
            if(!validPass) return res.status(400).json({error: 'Pass o email invalido'});

            const token = await generarJWT(usuario.id);

            res.json({usuario, token});
        } catch (error) {
            console.log(error);
            return res.status(500).json({error: `${error}`});
        }
    },

    renovarToken: async(req, res) => {
        try {
            const { usuario } = req;
            const token = await generarJWT(usuario.id);

            res.json({token, usuario});
        } catch (error) {
            console.log(error);
        }
    }
}