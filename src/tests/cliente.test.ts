import test from 'ava'
import inicializarDB from './setup'
inicializarDB()


import GenericService from '../api/services/generic.service'
import ClienteModel from '../config/db/models/cliente.model'

let service = new GenericService( ClienteModel )



let cliente = {	
	nome: "CLIENTE TEST",
	cpf: "14538432563",
    sexo: 'M',
    email: 'email@mail.com'
}


const create = () => service.create( cliente )

test.beforeEach(t =>  ClienteModel.destroy({ truncate : true, cascade: false }) )
test.after.always(t => ClienteModel.destroy({ truncate : true, cascade: false }))

test.serial('deveInserirCliente', async t =>{
    
    let client = await create()
    
    t.is(client.id, 1)    
    t.is(client.nome, 'CLIENTE TEST')    
})


test.serial('deveObterClientePorId', async t =>{
    await create()
    let obj = await service.findByPk(1)
    t.is(obj.id, 1)
})

test.serial('deveAtualizarCliente', async t =>{
    await create()
    let obj = await service.update(1, { nome: 'CLIENTE TEST UPDATE' })
    
    t.is(obj[0], 1)        
})

test('deveRemoverCliente', async t =>{
    await create()
    let obj = await service.delete(1)
    t.is(obj, 1)
})

test('deveListarClientes', async t =>{
    await create()
    let obj = await service.findAll()
    t.not(obj.length, 0)
})
  