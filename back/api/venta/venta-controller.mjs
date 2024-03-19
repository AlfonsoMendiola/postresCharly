import { Venta } from "./venta-model.mjs";
import { Producto } from "../producto/producto-model.mjs";

export const ventaController = {
    post: async(req, res) => {
        try {
            const data = new Venta({
                ...req.body,
                utilidad: req.body.precioTotal - req.body.costoTotal
            });
            
            //actualizar en inventario respecto a las cantidades del carrito
            const consultas = req.body.orden.map(async(producto)=>{
                const productoDB = await Producto.findById(producto.id_producto).exec();
                if(!productoDB) throw new Error(`no existe el producto: ${producto.id_producto}`);
                if(productoDB.existencia < producto.cantidad) throw new Error(`no hay suficiente producto`);

                productoDB.existencia -= producto.cantidad;
                productoDB.vendido += producto.cantidad;
                await productoDB.save();
            });
            
            await Promise.all(consultas)

            await data.save();
            res.json(data);
        } catch (error) {
            console.log(error);
            return res.status(500).json(error);
        }
    },

    get: async(req, res) => {
        try {
            const data = await Venta.findById(req.params.id).populate('orden.id_producto', 'nombre').exec();
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
                Venta.find().countDocuments().exec(),
                Venta.find().populate('orden.id_producto', 'nombre').limit(limite).skip( (pagina -1)*limite ).exec()
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