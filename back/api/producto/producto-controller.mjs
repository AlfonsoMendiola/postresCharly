import { subirArchivo } from "../../helpers/subir-archivo.mjs";
import { Producto } from "./producto-model.mjs";

export const productoController = {
    post: async(req, res) => {
        try {
            
            if(req.files){
                const imagen = await subirArchivo(req.files.image);
                req.body.image = `${process.env.DOMAIN}api/multimedia/${imagen}`;
            }
            const data = new Producto({
                ...req.body,
                utilidad: req.body.precioUnitario - req.body.costoUnitario
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
            const data = await Producto.findById(req.params.id).exec();
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
                Producto.find().countDocuments().exec(),
                Producto.find().limit(limite).skip( (pagina -1)*limite ).exec()
            ]);

            res.json({total, pages: Math.ceil( total / limite ), data});
            
        } catch (error) {
            console.log(error);
            return res.status(500).json(error);
        }
    },

    update: async(req, res) => {
        try {
            if(req.files){
                const imagen = await subirArchivo(req.files.image);
                req.body.image = `${process.env.DOMAIN}api/multimedia/${imagen}`;
            }

            const data = await Producto.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true}).exec();
            res.json(data);
            
        } catch (error) {
            console.log(error);
            return res.status(500).json(error);
        }
    },

    delete: async(req, res) => {
        try {
            const data = await Producto.findByIdAndDelete(req.params.id).exec();
            if(!data) return res.status(404).json({error: 'no existe'});
            res.json(data);
        } catch (error) {
            console.log(error);
            return res.status(500).json(error);
        }
    },
}