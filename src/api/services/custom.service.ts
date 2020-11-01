import customRepository from "../repositories/custom.repository";
import { emailPedido } from "../../utils/email/email";
import jsPDF from 'jspdf'
import { convertDate } from "../helper/data";
import { numberToReal } from "../helper/number";
import fs from "fs";
class CustomService{

    salvarPedido(dados: any){
        return customRepository.salvarPedido( dados )
    }

    buscarPedido(id: number){
        return customRepository.buscarPedido( id )
    }

    sendEmail(id: number){
        return emailPedido( id )
    }

    gerarPDF(id: number){
        return new Promise(async( resolve, rejec)=>{
            const pedido: any = await this.buscarPedido( id )           
            
            const doc = new jsPDF()
            doc.setFont("Helvetica");
            doc.setFontSize(25);
            doc.text('Dados do Pedido',70,10)
            let curDate = new Date()
            
            doc.setFontSize(13);            
            doc.text('Pedido',10,20)

            doc.setFontSize(10);            
            doc.text('Código:',15,25)            
            
            doc.text(`${pedido.id}`,30,25)
            
            doc.text('Data do pedido:',15,30)
            const dtPedido = new Date( pedido.dt_pedido )
            doc.text(convertDate( dtPedido ),45,30)

            doc.text('Observação:',15,35)
            doc.text(`${pedido.observacao.substring( 0, 60 )}...`,45,35)

            doc.setFontSize(13);            
            doc.text('Cliente',10,40)

            doc.setFontSize(10);            
            doc.text('Nome:',15,45)
            doc.text(pedido._cliente.dataValues.nome,30,45)

            doc.text('CPF:',15,50)
            doc.text(pedido._cliente.dataValues.cpf,30,50)

            doc.text('E-mail:',15,55)
            doc.text(pedido._cliente.dataValues.email,30,55)
            
            doc.text('Valor Total:',15,60)
            const produtos = pedido.produtos
            doc.text( numberToReal( this.totalDoPedido( produtos ) ),40,60)

            doc.setFontSize(15);            
            doc.text('Produtos',95,70)

            doc.setFontSize(12);
            doc.text('PRODUTO',10,80)
            doc.text('QTDE',80,80)
            doc.text('VALOR',120,80)
            doc.text('SUB TOTAL',170,80)

            doc.setFontSize(10);
            let linha = 80
            for (let index = 0; index < produtos.length; index++) {
                linha += 5
                doc.text( produtos[ index ].nome, 10, linha )
                doc.text( ""+produtos[ index ].qtde, 83, linha )
                doc.text( numberToReal( produtos[ index ].valor ), 120, linha )
                doc.text( numberToReal( produtos[ index ].total ), 170, linha )

                if( linha > 500 ) {
                    doc.addPage()
                    linha = 5;
                }
            }

            const fileName = `${curDate.getTime()}_pedido.pdf`
            doc.save(`public/${fileName}`)
              
            resolve({file: fileName})
        })

    }

    totalDoPedido( produtos ) {
        return produtos
                .map( p => p.total)
                .reduce((prev,value) => prev + value, 0)
    }

    removeFile(filePath){
        fs.unlink(filePath, (err) => {
            if (err) throw err;
                 console.log('successfully deleted '+filePath);
            });

           

            
    }

    

}

export default new CustomService