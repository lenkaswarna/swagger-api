import express from 'express';
//import bodyParser from 'body-parser';
import path from 'path';

var routes = require('./routes/routes');

var mail = require('./mail.api');
var nodemailer = require('nodemailer');
var swaggerJSDoc = require('swagger-jsdoc');
var bodyParser = require('body-parser');

//var router = express.Router();

/*
if (argv.domain !== undefined)
    domain = argv.domain;
else
    console.log('No --domain=xxx specified, taking default hostname "localhost".');

*/
var swaggerDefinition = {
    info: {
        title: 'Node Swagger API',
        version: '1.0.0',
        description: 'Demonstrating how to describe a RESTful API with Swagger',
    },
    host: 'localhost:3000',
    basePath: '/',
};
// options for the swagger docs
var options = {
    // import swaggerDefinitions
    swaggerDefinition: swaggerDefinition,
    // path to the API docs
    apis: ['./routes/routes.js']
};

// initialize swagger-jsdoc
var swaggerSpec = swaggerJSDoc(options);

class Server {
    constructor() {
        this.app = express();
    }

    configureApp() {
        this.app.set('port', (process.env.PORT || 3000));
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use(bodyParser());
        this.app.use(express.static(path.join(__dirname, 'public')));
        this.app.use('/', routes);
    }

    configureCORS() {
        // Additional middleware which will set headers that we need on each request.
        this.app.use((req, res, next) => {
            // Set permissive CORS header - this allows this server to be used only as
            // an API server in conjunction with something like webpack-dev-server.
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.setHeader('Access-Control-Allow-Methods', 'POST, PUT, DELETE, GET');
            res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With');
            // Disable caching so we'll always get the latest userDetails.
            res.setHeader('Cache-Control', 'no-cache');
            next();
        });
    }

    configureRoutes() {

        //this.app.post('/send', mail.post);
        /*this.app.get('/api/doctorGet', doctor.get);
        this.app.post('/api/doctorPost', doctor.post);
        this.app.put('/api/doctorEdit/:id', doctor.put);
        this.app.delete('/api/doctorDelete/:id', doctor.delete);*/
        this.app.get('/swagger.json', function(req, res) {
            res.setHeader('Content-Type', 'application/json');
            res.send(swaggerSpec);
        });
    }

    listen(port) {
        this.app.listen(port, () => {
            console.log(`Server started: http://localhost:${port}/`);
        });
    }

    run() {
        this.configureApp();
        this.configureCORS()
        this.configureRoutes();
        this.listen(this.app.get('port'));
    }
}

export default Server;