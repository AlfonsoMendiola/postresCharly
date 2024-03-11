const express = require('express');
const router = express.Router();

const Cotizacion = require('../models/cotizacion');
//importar los middleware personalizados para mayor seguridad en las rutas
const {verificarAuth, verificarAdministrador} = require('../middlewares/autenticacion');


//rutas

//registrar una nueva cotizacion
router.post('/nueva-cot', async(req, res) => {
    const body = req.body;
    try {
        const cotizacionDB = await Cotizacion.create(body);
        res.json(cotizacionDB)
    } catch (error) {
        return res.status(500).json({
            mensaje: 'Ocurrio un error',
            error
        })
    }
})

//obtener las cotizaciones paginadas
router.get('/ver-cot', verificarAuth, async(req, res)=>{
    
    const limite = Number(req.query.limite) || 50;
    const skip = Number(req.query.skip) || 0;
    try {
        //find no tiene parametro porque la info no debe ser filtrada
        const cotizacionDB = await Cotizacion.find().limit(limite).skip(skip);
        const totalCotizaciones = await Cotizacion.find().countDocuments();
        res.json({cotizacionDB, totalCotizaciones});
    } catch (error) {
        return res.status(500).json({
            mensaje: 'Ocurrio un error al obtener las cotizaciones',
            error
        })
    }
})
//borrar una cotizacion

router.delete('/borrar-cot/:id', verificarAuth ,async(req, res) => {
    const _id = req.params.id;
    try {
        const cotizacionDB = await Cotizacion.findByIdAndDelete({_id})
        if(!cotizacionDB){
            return res.status(400).json({
                mensaje: 'Ocurrio un error al tratar de aliminar',
                error
            })
        }
        res.json(cotizacionDB)
    } catch (error) {
        return res.status(400).json({
            mensaje: 'Ocurrio un error',
            error
        })
    }
})


module.exports = router;

