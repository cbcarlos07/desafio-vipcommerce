import CentroCustoModel from "../../config/db/models/centro-custo.model";
import DepartamentoModel from "../../config/db/models/departamento.model";

class CustomRepository {


    obterTodosDepartamentoPorCentroCusto(){
        return CentroCustoModel.findAll({
            include: [
                {
                    association: '_departamento'
                }
            ]
        })
    }

    obterUsuarioPorDepartamento(id: number){
        return DepartamentoModel.findAll({
            where: { id },
            include: [
                {
                    association: '_users'
                }
            ]
        })
    }

}


export default new CustomRepository