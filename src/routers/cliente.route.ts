import * as restifyRouter from 'restify-router'

import clienteController from '../api/controllers/cliente.controller'
const Router = restifyRouter.Router


const controller = clienteController

const clienteRouter = new Router()

clienteRouter.post('', controller.create )

clienteRouter.put('/:id',  controller.update )

clienteRouter.del('/:id', controller.delete )

clienteRouter.get('/:id', controller.findByPK )

clienteRouter.get('', controller.findAll )

export default clienteRouter