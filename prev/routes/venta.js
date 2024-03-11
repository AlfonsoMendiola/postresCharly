const express = require('express');
const router = express.Router();

const Venta = require('../models/venta');
const Producto = require('../models/producto');

const {verificarAuth, verificarAdministrador} = require('../middlewares/autenticacion');

router.post('/nuevo',verificarAuth, async(req, res) =>{
    const body = req.body;
    console.log(body);
    try {
        //guardar la venta en el carrito
        const ventaDB = await Venta.create(body);

        //actualizar en inventario respecto a las cantidades del carrito
        console.log('-------productos------------');
        const productos = body.orden;
        console.log(productos);
        //usar foreach
        productos.forEach(async element => {
            let _id = element.id;
            let existencia = element.existencia - element.cantidad;

            nuevoProducto = {existencia}
            
            const productoDB = await Producto.findByIdAndUpdate(_id, nuevoProducto, {new: true})
            console.log(productoDB)
        });


        res.json({mensaje:'Venta procesada correctamente', ventaDB});
    } catch (error) {
        return res.status(500).json({
            mensaje: 'Ocurrio un error al procesar la venta',
            error
        })
    }
})

//get sin parametros para conseguir todos los documentos
router.get('/ver-todos', [verificarAuth, verificarAdministrador], async(req, res) => {
    try {
        const ventaDB = await Venta.find();
        const totalVentas = await Venta.find().countDocuments();
        res.json({ventaDB, totalVentas});
    } catch (error) {
        return res.status(400).json({
            mensaje: 'Ocurrio un error al obtener todos las Venta',
            error
        })
    }
})

//obtener productos paginados
router.get('/ver-paginados', [verificarAuth, verificarAdministrador], async(req, res) => {
    const limite = Number(req.body.limite) || 50;
    const skip = Number(req.query.skip || 50);
    try {
        const ventaDB = await Venta.find().limit(limite).skip(skip);
        const totalVentas = await Venta.find().countDocuments();
        res.json({ventaDB, totalVentas});
        
    } catch (error) {
        return res.status(400).json({
            mensaje: 'Ocurrio un error al obtener las ventas paginadas',
            error
        })
    }
})

// obtener un producto
router.get('/ver-unico/:id', [verificarAuth, verificarAdministrador], async(req, res) => {
    const _id = req.params.id;
    try {
        const ventaDB = await Venta.findOne({_id})
        // el status 200 esta por defecto en express
        res.json(ventaDB)
    } catch (error) {
        return res.status(400).json({
            mensaje: 'Ocurrio un error al obtener una unica venta',
            error
        })
    }
})


module.exports = router;

