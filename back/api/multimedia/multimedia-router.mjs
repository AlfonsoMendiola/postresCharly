import { Router } from "express";

import { check } from "express-validator";
import { validarCampos } from '../../middlewares/validar-campos.mjs'
import { multimediaController } from "./multimedia-controller.mjs";

const multimediaRouter = Router()

multimediaRouter.get('/:nombre', [
    check('nombre', 'el nombre es obligatorio'),
    
    validarCampos
], multimediaController.getArchivo);

export { multimediaRouter }