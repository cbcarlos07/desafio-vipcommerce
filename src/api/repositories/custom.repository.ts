
import PedidoModel from "../../config/db/models/pedido.model"
import PedidoProdutoModel from "../../config/db/models/pedido-produto.model"
import ClienteModel from "../../config/db/models/cliente.model"
import ProdutoModel from "../../config/db/models/produto.model"
import FormaPagamentoModel from "../../config/db/models/forma-pagamento.model"
import { Sequelize } from "sequelize"



class CustomRepository {

    salvarPedido(dados: any){
        const { produtos, ...data } = dados
        return new Promise(async (resolve, reject)=>{
            PedidoModel
                .create(data)
                .then( (response: any) =>{
                    let multiple = produtos.map( p =>{
                        return { 
                                pedido_id: response.dataValues.id,
                                produto_id: p.produto, 
                                qtde: p.qtde
                             }
                    })
                    PedidoProdutoModel
                        .bulkCreate( multiple )
                        .then( _resp =>{
                            resolve({id: response.dataValues.id})
                        })

                })
            

        })
    }

    buscarPedido( id: number ){
        return new Promise((resolve, rejecct)=>{
            PedidoModel.findOne({
                attributes: [
                    'id',
                    'dt_pedido',
                    'observacao'
                ],
                where: { id },
                include: [
                    {
                        model: ClienteModel,
                        as: '_cliente'
                    },
                    {
                        model: FormaPagamentoModel,
                        as: '_forma_pagamento'
                    }
                ]
            }).then( response =>{                
                
                PedidoProdutoModel.findAll({                    
                    where: {
                        pedido_id: response.dataValues.id
                    }
                }).then( async _resp =>{
                    

                    let obj = _resp.map( async prod =>{
                        let produto = {...prod.dataValues}
                        
                        const descricao = await ProdutoModel.findByPk( produto.produto_id )
                        
                        const nome = descricao.dataValues.nome
                        
                        const valor = descricao.dataValues.valor

                        const total = valor * produto.qtde
                        return {
                            nome, valor, qtde: produto.qtde, total
                        }

                    })
                    
                    let produtos = await Promise.all( obj )
                    
                    resolve({
                        ...response.dataValues,
                        produtos
                    })

                })
            })

        })
    }

    
   

}


export default new CustomRepository