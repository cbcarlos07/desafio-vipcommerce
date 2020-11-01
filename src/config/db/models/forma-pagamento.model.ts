import { DataTypes} from 'sequelize'
import { Model } from 'sequelize-typescript'
class FormaPagamentoModel extends Model {

    static init( sequelize ){
        super.init({
            nome: DataTypes.STRING           
        }, { 
            tableName: 'forma_pagamento',
            sequelize 
        })
    }



}



export default FormaPagamentoModel