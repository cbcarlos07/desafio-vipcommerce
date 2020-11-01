import { DataTypes} from 'sequelize'
import { Model } from 'sequelize-typescript'
class ProdutoModel extends Model {

    static init( sequelize ){
        super.init({
            nome: DataTypes.STRING,
            cor: DataTypes.STRING,
            tamanho: DataTypes.STRING,
            valor: DataTypes.DOUBLE,
        }, { 
            tableName: 'produto',
            sequelize 
        })
    }



}



export default ProdutoModel