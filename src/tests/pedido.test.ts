import test from 'ava'
import inicializarDB from './setup'
inicializarDB()


import GenericService from '../api/services/generic.service'

import ProdutoModel from '../config/db/models/produto.model'
import customService from '../api/services/custom.service'
import ClienteModel from '../config/db/models/cliente.model'
import PedidoModel from '../config/db/models/pedido.model'



let serviceProduto = new GenericService( ProdutoModel )
let serviceCliente = new GenericService( ClienteModel )
let servicePedido  = new GenericService( PedidoModel )

let produto = {	
	nome: "PRODUTO TEST",
	cor: "VERDE",
    tamanho: '27 cm',
    valor: 10.0
}

let cliente = {	
	nome: "CLIENTE TEST",
	cpf: "14538432563",
    sexo: 'M',
    email: 'email@mail.com'
}

let pedido = {
    cliente_id: 1,
    observacao: 'Obs',
    forma_pagamento_id: 1,
    produtos: [{
        produto: 1,
        qtde: 2
    }]
}


const createClient = () => serviceCliente.create( cliente )

const createProduto = () => serviceProduto.create( produto )

const createPedido = () => customService.salvarPedido( pedido )
test.before( async t => {
    await PedidoModel.destroy({ truncate : true, cascade: false }) 
    await ClienteModel.destroy({ truncate : true, cascade: false }) 
    await createClient()
    await createProduto()
})

test.beforeEach( async t =>  {
    await ProdutoModel.destroy({ truncate : true, cascade: false }) 
})
test.after.always( async t => {
    
    await ProdutoModel.destroy({ truncate : true, cascade: false }) 
})

test.after(async t=>{
    await PedidoModel.destroy({ truncate : true, cascade: false }) 
    await ClienteModel.destroy({ truncate : true, cascade: false }) 
})

test.serial('deveSalvarPedido', async t =>{
    
    let retorno: any = await customService.salvarPedido( pedido )
    t.is(retorno.id, 1)    
})

test.serial('deveAtualizarPedido', async t =>{
    
    await createPedido()

    let pedido1 = {
        observacao: 'Obs update -'
    }
    let retorno = await servicePedido.update( 1, pedido1 )
    t.is(retorno[0], 1)    
})