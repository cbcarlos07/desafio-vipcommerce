import * as route from 'restify-router'
import clienteRouter from './cliente.route'
import produtoRouter from './produto.route'
import pedidoRouter from './pedido.route'
const Route =  route.Router
const router = new Route()



const prefix = '/api/v1'

const routerConfig = deps =>{
    const {app} = deps
    router.add(`${prefix}/clientes`, clienteRouter)
    router.add(`${prefix}/produtos`, produtoRouter)
    router.add(`${prefix}/pedidos`, pedidoRouter)
    router.applyRoutes( app )

}

export default routerConfig