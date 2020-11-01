import customRepository from "../repositories/custom.repository";
import DepartamentoModel from "../../config/db/models/departamento.model";

class CustomService{

    obterTodosDepartamentoPorCentroCusto(){
        return customRepository.obterTodosDepartamentoPorCentroCusto()
    }

    obterUsuarioPorDepartamento(id: number){
        return customRepository.obterUsuarioPorDepartamento(id)
    }
    

}

export default new CustomService