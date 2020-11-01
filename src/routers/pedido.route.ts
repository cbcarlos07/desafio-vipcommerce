import * as restifyRouter from 'restify-router'

import pedidoController from '../api/controllers/pedido.controller'
const Router = restifyRouter.Router


const controller = pedidoController

const pedidoRouter = new Router()

pedidoRouter.post('', controller.create )
pedidoRouter.get('/:id', controller.findByPk )
pedidoRouter.get('', controller.findAll )
pedidoRouter.put('/:id', controller.atualizar )
pedidoRouter.del('/:id', controller.delete )

pedidoRouter.get('/:id/sendmail', controller.sendMail )
pedidoRouter.get('/:id/report', controller.gerarPDF )


export default pedidoRouter