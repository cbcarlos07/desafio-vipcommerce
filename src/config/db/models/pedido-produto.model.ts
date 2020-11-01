import { DataTypes} from 'sequelize'
import { Model } from 'sequelize-typescript'
class PedidoProdutoModel extends Model {

    static init( sequelize ){
        super.init({
            produto_id: DataTypes.INTEGER,
            pedido_id: DataTypes.INTEGER,
            qtde: DataTypes.INTEGER
        }, { 
            tableName: 'pedido_produto',
            sequelize 
        })
    }



}



export default PedidoProdutoModel