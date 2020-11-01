import AssociationsTable from "../models/associate.model"
import ClienteModel from "../models/cliente.model"
import FormaPagamentoModel from "../models/forma-pagamento.model"
import ProdutoModel from "../models/produto.model"
import PedidoModel from "../models/pedido.model"
import PedidoProdutoModel from "../models/pedido-produto.model"

const Sequelize = require('sequelize')
const dbConfig = require('../config/database')

const connection = new Sequelize( dbConfig )

PedidoProdutoModel.init( connection )
PedidoProdutoModel.removeAttribute('id')
ClienteModel.init( connection )
FormaPagamentoModel.init( connection )
ProdutoModel.init( connection )
PedidoModel.init( connection )

AssociationsTable.associateMany(PedidoModel, ProdutoModel, 'pedido_produto', 'pedido_id','_produtos')
AssociationsTable.associateMany(ProdutoModel, PedidoModel, 'pedido_produto', 'produto_id','_pedidos')
AssociationsTable.associate( PedidoModel, FormaPagamentoModel, 'forma_pagamento_id', '_forma_pagamento' )
AssociationsTable.associate( PedidoModel, ClienteModel, 'cliente_id', '_cliente' )



export default connection