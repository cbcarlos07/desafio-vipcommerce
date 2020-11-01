import * as restifyRouter from 'restify-router'

import produtoController from '../api/controllers/produto.controller'
const Router = restifyRouter.Router


const controller = produtoController

const produtoRouter = new Router()

produtoRouter.post('', controller.create )

produtoRouter.put('/:id',  controller.update )

produtoRouter.del('/:id', controller.delete )

produtoRouter.get('/:id', controller.findByPK )

produtoRouter.get('', controller.findAll )

export default produtoRouter