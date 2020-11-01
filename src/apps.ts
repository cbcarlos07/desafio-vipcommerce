import * as restify from 'restify'
import bodyParser from 'body-parser'

import routerConfig from './routers'

const environments = require('./config/environments')
import CargoModel from './config/db/models/forma-pagamento.model';
import GenericService from './api/services/generic.service';
import cors from './utils/cors';

class Application{
    app: any
    port: any
    connection: any

    constructor(){
        this.app = restify.createServer()
        this.port = environments.SERVER_PORT
        this.connection = new GenericService( CargoModel )
    }

    listen(){
        require('./config/db/database')
        

        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded( { extended:false } ));
        

        this.connection
            .testConnection()
            .then(() => {
                this.configCors()                
                this.routes(  )
                this.app.listen( this.port, () =>{
                    console.log(`Api rodando da porta ${this.port}`);
                    
                })
                
            })
    }

    configCors(){
        this.app.pre( cors.preflight )
        this.app.use( cors.actual )
        this.app.use( bodyParser.json() )
        this.app.use( bodyParser.urlencoded({extended: true}) )
    }



    routes(  ){
        let deps = {
            app: this.app
            
        }
        //this.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
        routerConfig( deps )
    }
}

export default new Application