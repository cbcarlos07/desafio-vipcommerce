import { DataTypes} from 'sequelize'
import { Model } from 'sequelize-typescript'
class PedidoModel extends Model {

    static init( sequelize ){
        super.init({
            cliente_id: DataTypes.INTEGER,
            dt_pedido: DataTypes.DATE,
            observacao: DataTypes.STRING,
            forma_pagamento_id: DataTypes.INTEGER,
        }, { 
            tableName: 'pedido',
            sequelize 
        })
    }



}



export default PedidoModel