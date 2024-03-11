import { Producto } from "./producto-model.mjs";

export const productoController = {
    post: async(req, res) => {
        try {
            const body = req.body;
        
            if(req.file){
                body.image = req.file.filename
                console.log(req.file);
            }else{
                body.image = "Sin imagen"
            }
            const data = await Producto.create(body);
            res.json(data);
            
        } catch (error) {
            console.log(error);
            return res.status(500).json(error);
        }
    },

    get: async(req, res) => {
        try {
            
            const data = await Producto.findById(req.params.id).exec();
            res.json(data);
        } catch (error) {
            console.log(error);
            return res.status(500).json(error);
        }
    },

    gets: async(req, res) => {
        try {
            const limite = Number(req.query.limite) || 50;
            const pagina = Number(req.query.skip) || 1;
            
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
            const _id = req.params.id;
            const body = req.body;

            if(req.file){
                body.image = req.file.filename
                console.log(req.file);
            }

            const data = await Producto.findByIdAndUpdate(_id, body, {new: true, runValidators: true}).exec();
            res.json(data);
            
        } catch (error) {
            console.log(error);
            return res.status(500).json(error);
        }
    },

    delete: async(req, res) => {
        try {
            const data = await Producto.findByIdAndDelete(req.params.id).exec();
            res.json(data);
        } catch (error) {
            console.log(error);
            return res.status(500).json(error);
        }
    },
}