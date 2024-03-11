const express = require('express');
const router =  express.Router();

//importar el modelo de los usuarios
const User = require('../models/user');

//importar los middelwares personalizados para la autenticacion de usuarios y uso del token
const {verificarAuth, verificarAdministrador} = require('../middlewares/autenticacion');

//importar el bcrypt para encriptar contraseñas
const bcrypt = require('bcrypt');
const saltRounds = 10;

//importar underscore para filtrar campos en la actualizacion
const _ = require('underscore');

//rutas

router.post('/nuevo-usuario', async(req, res) => {
    // se construye el body a mano para encriptar la pass body anterior: const body = req.body

    const body = {
        nombre: req.body.nombre,
        email: req.body.email,
        role: req.body.role,
        vista: req.body.vista,
    }
    //encriptar la pass con un coste computacional de saltRounds = 10
    body.pass = bcrypt.hashSync(req.body.pass, saltRounds);

    try {
        const usuarioDB = await User.create(body)
        res.json(usuarioDB)
    } catch (error) {
        return res.status(500).json({
            mensaje: 'Ocurio un eror',
            error
        })
    }
});

//obtener unico documento
router.get('/usuario/:id', [verificarAuth, verificarAdministrador], async(req, res) => {
    const _id = req.params.id;
    try {
        const usuarioDB = await User.findOne({_id})
        // el status 200 esta por defecto en express
        res.json(usuarioDB)
    } catch (error) {
        return res.status(400).json({
            mensaje: 'Ocurrio un error al obtener un unico usuario',
            error
        })
    }
})

//documentos paginados
router.get('/usuario', [verificarAuth, verificarAdministrador], async(req, res)=>{
    //const usuarioId = req.prospecto._id;
    const limite = Number(req.query.limite) || 50;
    const skip = Number(req.query.skip) || 0;
    try {
        //find no tiene parametro porque la info no debe ser filtrada
        const usuarioDB = await User.find().limit(limite).skip(skip);
        const totalUsuarios = await User.find().countDocuments();
        res.json({usuarioDB, totalUsuarios});
    } catch (error) {
        return res.status(500).json({
            mensaje: 'Ocurrio un error al obtener los usuarios',
            error
        })
    }
});


//eliminar documento
router.delete('/usuario/:id', [verificarAuth, verificarAdministrador], async(req, res) => {
    const _id = req.params.id;
    try {
        const usuarioDB = await User.findByIdAndDelete({_id})
        return res.json(usuarioDB);
    } catch (error) {
        return res.status(400).json({
            mensaje: 'Ocurrio un error al eliminar el usuario',
            error
        });
    }
});


//actualizar documento
router.put('/usuario/:id', [verificarAuth, verificarAdministrador], async(req, res) => {
    const _id = req.params.id;
    //en el array se indican los campos que se pueden modificar
    const body = _.pick(req.body, ['nombre', 'email', 'pass','vista', 'activo']);
    if(body.pass){
        body.pass = bcrypt.hashSync(req.body.pass, saltRounds);
    }
    try {
        const usuarioDB = await User.findByIdAndUpdate(_id, body, {new: true, runValidators: true});
        return res.json(usuarioDB);
    } catch (error) {
        return res.status(400).json({
            mensaje: 'Ocurrio un error',
            error
        });
    }
});



//exportar el router

module.exports = router;