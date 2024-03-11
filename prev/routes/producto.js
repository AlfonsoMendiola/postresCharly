const express = require('express');
const router = express.Router();

const Producto = require('../models/producto');

const {verificarAuth, verificarAdministrador} = require('../middlewares/autenticacion');


//añadir nuevo producto
router.post('/nuevo',[verificarAuth, verificarAdministrador], async(req, res) => {
    const body = req.body;
    
    if(req.file){
        body.image = req.file.filename
        console.log(req.file);
    }else{
        body.image = "Sin imagen"
    }
    
    try {
        const productoDB = await Producto.create(body);
        res.json(productoDB);
    } catch (error) {
        return res.status(500).json({
            mensaje: 'Ocurrio un error al registar un nuevo producto',
            error
        })
        
    }
})

//get sin parametros para conseguir todos los documentos
router.get('/ver-todos', verificarAuth, async(req, res) => {
    
    try {
        const productoDB = await Producto.find();
        const totalProductos = await Producto.find().countDocuments();
        res.json({productoDB, totalProductos});
    } catch (error) {
        return res.status(400).json({
            mensaje: 'Ocurrio un error al obtener todos los productos',
            error
        })
    }
})

//obtener productos paginados
router.get('/ver-paginados', [verificarAuth, verificarAdministrador], async(req, res) => {
    const limite = Number(req.body.limite) || 50;
    const skip = Number(req.query.skip || 50);
    try {
        const productoDB = await Producto.find().limit(limite).skip(skip);
        const totalProductos = await Producto.find().countDocuments();
        res.json({productoDB, totalProductos});
        
    } catch (error) {
        return res.status(400).json({
            mensaje: 'Ocurrio un error al obtener los prospectos paginados',
            error
        })
    }
})

// obtener un producto
router.get('/ver-unico/:id', verificarAuth, async(req, res) => {
    const _id = req.params.id;
    try {
        const productoDB = await Producto.findOne({_id})
        // el status 200 esta por defecto en express
        res.json(productoDB)
    } catch (error) {
        return res.status(400).json({
            mensaje: 'Ocurrio un error al obtener un unico producto',
            error
        })
    }
})

//actualicar producto
router.put('/actualizar/:id', [verificarAuth, verificarAdministrador], async(req, res) => {
    const _id = req.params.id;
    const body = req.body;

    if(req.file){
        body.image = req.file.filename
        console.log(req.file);
    }

    try {
        const productoDB = await Producto.findByIdAndUpdate(_id, body, {new: true, runValidators: true})
        res.json(productoDB)
    } catch (error) {
        return res.status(400).json({
            mensaje: 'Ocurrio un error al actualizar el producto',
            error
        })
    }
})

router.delete('/eliminar/:id', [verificarAuth, verificarAdministrador], async(req, res) => {
    const _id = req.params.id;
    const body = req.body;
    try {
        const productoDB = await Producto.findByIdAndDelete({_id})
        if(!productoDB){
            return res.status(400).json({mensaje: 'Ocurrio un error al eliminar', error})
        }
        res.json(productoDB)
    } catch (error) {
        return res.status(400).json({
            mensaje: 'Ocurrio un error al eliminar',
            error
        })
    }
})

module.exports = router;