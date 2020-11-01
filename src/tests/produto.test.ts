import test from 'ava'
import inicializarDB from './setup'
inicializarDB()


import GenericService from '../api/services/generic.service'

import ProdutoModel from '../config/db/models/produto.model'

let model = ProdutoModel

let service = new GenericService( model )



let objeto = {	
	nome: "PRODUTO TEST",
	cor: "VERDE",
    tamanho: '27 cm',
    valor: 10.0
}


const create = () => service.create( objeto )

test.beforeEach(t =>  model.destroy({ truncate : true, cascade: false }) )
test.after.always(t => model.destroy({ truncate : true, cascade: false }))

test.serial('deveInserirProduto', async t =>{
    
    let client = await create()
    
    t.is(client.id, 1)    
    t.is(client.nome, 'PRODUTO TEST')    
})


test.serial('deveObterProdutoPorId', async t =>{
    await create()
    let obj = await service.findByPk(1)
    t.is(obj.id, 1)
})

test('deveAtualizarProduto', async t =>{
    await create()
    let obj = await service.update(1, { nome: 'Produto TEST UPDATE' })
    
    t.is(obj[0], 1)        
})

test.serial('deveRemoverProduto', async t =>{
    await create()
    let obj = await service.delete(1)
    t.is(obj, 1)
})

test.serial('deveListarProdutos', async t =>{
    await create()
    let obj = await service.findAll()
    t.not(obj.length, 0)
})
  