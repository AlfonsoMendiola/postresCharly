import { Router } from 'express';

import { usuarioController } from './user-controller.mjs';
import { verificarAuth, verificarAdministrador } from '../../middlewares/autenticacion.mjs';

const usuarioRouter = Router();

usuarioRouter.post('/', [
    //
], usuarioController.post);


usuarioRouter.get('/:id', [
    verificarAuth, 
    verificarAdministrador
], usuarioController.get)

usuarioRouter.get('/', [
    verificarAuth, 
    verificarAdministrador
], usuarioController.gets);

//const body = _.pick(req.body, ['nombre', 'email', 'pass','vista', 'activo']);
usuarioRouter.put('/:id', [
    verificarAuth, 
    verificarAdministrador
], usuarioController.update);

usuarioRouter.delete('/:id', [
    verificarAuth,
    verificarAdministrador
], usuarioController.delete);


export { usuarioRouter }