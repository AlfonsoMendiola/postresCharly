import { User } from "./user-model.mjs";
import bcrypt from 'bcrypt';

export const usuarioController = {
    post: async(req, res) => {
        try {
            const data = new User({
                ...req.body,
                pass: bcrypt.hashSync(req.body.pass, bcrypt.genSaltSync())
            });
            await data.save();
            
            res.json(data);
        } catch (error) {
            console.log(error);
            return res.status(500).json(error);
        }
    },

    get: async(req, res) => {
        try {
            const data = await User.findById(req.params.id).exec();
            if(!data) return res.status(404).json({error: 'no existe'});

            res.json(data);
        } catch (error) {
            console.log(error);
            return res.status(500).json(error);
        }
    },

    gets: async(req, res) => {
        try {
            const limite = Number(req.query.limite) || 50;
            const pagina = Number(req.query.pagina) || 1;
            
            const [total, data] = await Promise.all([
                User.find().countDocuments().exec(),
                User.find().limit(limite).skip( (pagina -1)*limite ).exec()
            ]);

            res.json({total, pages: Math.ceil( total / limite ) , data});
        } catch (error) {
            console.log(error);
            return res.status(500).json(error);
        }
    },

    update: async(req, res) => {
        try {

            if(req.body.pass){
                req.body.pass = bcrypt.hashSync(req.body.pass, bcrypt.genSaltSync());
            }
            const data = await User.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true});
            res.json(data);
        } catch (error) {
            console.log(error);
            return res.status(500).json(error);
        }
    },

    delete: async(req, res) => {
        try {
            const data = await User.findByIdAndDelete(req.params.id);
            if(!data) return res.status(404).json({error: 'no existe'});
            
            res.json(data);
        } catch (error) {
            console.log(error);
            return res.status(500).json(error);
        }
    },
}