import { DataTypes} from 'sequelize'
import { Model } from 'sequelize-typescript'
class ClienteModel extends Model {

    static init( sequelize ){
        super.init({
            nome: DataTypes.STRING,
            cpf: DataTypes.STRING,
            sexo: DataTypes.CHAR(1),
            email: DataTypes.STRING,
        }, { 
            tableName: 'cliente',
            sequelize 
        })
    }



}



export default ClienteModel