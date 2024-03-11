//import express from "express";
const express = require('express');
const router = express.Router();


//importar el modelo de los prospectos
//import Prospecto from '../models/prospecto';
const Prospecto = require('../models/prospecto');
//importar los middleware personalizados para mayor seguridad en las rutas
const {verificarAuth, verificarAdministrador} = require('../middlewares/autenticacion');


//rutas

//registrar un nuevo prospecto
router.post('/prospecto', async(req, res) => {
    const body = req.body;
    try {
        //se busca el email
        const prospectoDB = await Prospecto.create(body)
        res.json(prospectoDB)
    } catch (error) {
        return res.status(500).json({
            mensaje: 'Ocurrio un error',
            error
        })
    }
})

//obtener prospectos paginados

router.get('/prospecto', verificarAuth, async(req, res)=>{
    //const prospectoId = req.prospecto._id;
    const limite = Number(req.query.limite) || 50;
    const skip = Number(req.query.skip) || 0;
    try {
        //find no tiene parametro porque la info no debe ser filtrada
        const prospectoDB = await Prospecto.find().limit(limite).skip(skip);
        const totalProspectos = await Prospecto.find().countDocuments();
        res.json({prospectoDB, totalProspectos});
    } catch (error) {
        return res.status(500).json({
            mensaje: 'Ocurrio un error al obtener los prospectos',
            error
        })
    }
})





module.exports = router;