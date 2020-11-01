

import customService from '../services/custom.service';
import GenericService from '../services/generic.service';
import PedidoModel from '../../config/db/models/pedido.model';
import fs from "fs";

let service: any
let serviceGeneric
class PedidoController {    
    
    constructor(){
        service = customService
        serviceGeneric = new GenericService( PedidoModel )
    }

    create(req, resp){
        
        return service
                   .salvarPedido( req.body )
                    .then( (response: any) =>{
                        resp.send( {msg: "Item salvo com sucesso!", id: response.id},200 )
                    }).catch( e => {
                        console.log(e);
                            
                        resp.send( {msg: "Falha ao tentar adicionar item!"},201 )
                    })
    }

    findByPk( req, resp){
        return service
                .buscarPedido( +req.params.id )
                .then( (response: any) =>{
                    resp.send( response ,200 )
                }).catch( e => {
                    console.log(e);
                        
                    resp.send( {msg: "Falha ao tentar buscar item!"},201 )
                })
    }

    findAll(req, resp){
        return serviceGeneric
                    .findAll()
                    .then( (response: any) =>{
                        resp.send( response ,200 )
                    }).catch( e => {
                        console.log(e);
                            
                        resp.send( {msg: "Falha ao tentar buscar item!"},201 )
                    })
    }

    atualizar(req, resp){
        return serviceGeneric
                    .update(req.params.id, req.body)
                    .then( (response: any) =>{
                        resp.send( {msg: 'Item atualizado com sucesso'} ,200 )
                    }).catch( e => {
                        console.log(e);
                            
                        resp.send( {msg: "Falha ao tentar buscar item!"},201 )
                    })
    }

    delete( req, resp ){
        return serviceGeneric
                   .delete( req.params.id )
                   .then( (response: any) =>{
                        resp.send( {msg: "Item removido com sucesso!"},200 )
                    }).catch( e => {
                        resp.send( {msg: "Falha ao tentar remover item!"},201 )
                    })
    }

    sendMail( req, resp ){
        return service
                   .sendEmail( req.params.id )
                   .then( (response: any) =>{
                        resp.send( response,200 )
                    }).catch( e => {
                        resp.send( {msg: "Falha ao tentar enviar e-mail!"},201 )
                    })
    }

    gerarPDF(req, resp){
        return service
                   .gerarPDF( req.params.id )
                   .then( (response: any) =>{
                       // process headers
                       const filePath = `public/${response.file}`
                       /*resp.writeHead(200, {
                           "Content-Type": 'application/octet-stream',
                           "Content-Disposition": "attachment; filename=" + response.file
                        });
                        */
                       var file = fs.readFileSync(filePath, 'binary');

                        resp.setHeader('Content-Length', file.length);
                        resp.write(file, 'binary');
                        resp.end();
                        //readStream.pipe(resp);
                        service.removeFile( filePath )
                        //service.removeFile( `${filePath} (1)` )
                            
                    }).catch( e => {
                            console.log(e);
                            
                            resp.send( {msg: "Falha ao tentar gerar PDF!"},201 )
                    })
    }

    




   

}


export default new PedidoController