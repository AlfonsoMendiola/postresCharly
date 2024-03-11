import { Venta } from "./venta-model.mjs";
import { Producto } from "../producto/producto-model.mjs";

export const ventaController = {
    post: async(req, res) => {
        try {
            const body = req.body;
            const data = await Venta.create(body);

            //actualizar en inventario respecto a las cantidades del carrito
            
            const productos = body.orden;
            productos.forEach(async element => {
                let _id = element.id;
                let existencia = element.existencia - element.cantidad;

                nuevoProducto = {existencia}
                
                const productoDB = await Producto.findByIdAndUpdate(_id, nuevoProducto, {new: true})
                console.log(productoDB)
            });

            res.json(data);
        } catch (error) {
            console.log(error);
            return res.status(500).json(error);
        }
    },

    get: async(req, res) => {
        try {
            const data = await Venta.findById(req.params.id).exec();
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
            res.json('hola mundo');
        } catch (error) {
            console.log(error);
            return res.status(500).json(error);
        }
    },
    delete: async(req, res) => {
        try {
            res.json('hola mundo');
        } catch (error) {
            console.log(error);
            return res.status(500).json(error);
        }
    },
}