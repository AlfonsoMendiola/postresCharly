import { Router } from 'express';
import { productoController } from './producto-controller.mjs';

import { verificarAuth, verificarAdministrador } from '../../middlewares/autenticacion.mjs';

const productoRouter = Router();

productoRouter.post('/', [
    verificarAuth,
    verificarAdministrador
], productoController.post);


// obtener un producto
productoRouter.get('/:id', [
    verificarAuth
], productoController.get);

productoRouter.get('/', [
    verificarAuth,
    verificarAdministrador
], productoController.gets);


//actualicar producto
productoRouter.put('/:id', [
    verificarAuth, 
    verificarAdministrador
], productoController.update);

productoRouter.delete('/:id', [
    verificarAuth,
    verificarAdministrador
], productoController.delete);

export {productoRouter}