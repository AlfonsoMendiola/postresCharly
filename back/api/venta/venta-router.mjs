import { Router } from 'express';
import { ventaController } from './venta-controller.mjs';

import { verificarAuth, verificarAdministrador } from '../../middlewares/autenticacion.mjs';

const ventaRouter = Router();

ventaRouter.post('/',[
    verificarAuth
], ventaController.post);

ventaRouter.get('/:id', [
    verificarAuth, 
    verificarAdministrador
], ventaController.get);

//obtener productos paginados
ventaRouter.get('/', [
    verificarAuth,
    verificarAdministrador
], ventaController.gets)


export {ventaRouter}

