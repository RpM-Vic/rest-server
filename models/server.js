
//server.js
const express = require('express');
const cors = require('cors');
const path = require('path');
const fileUpload = require('express-fileupload');
require('dotenv').config();

const router = require('../routes/users');
const routerAuth = require('../routes/authRoutes');
const { dbConnection } = require('../database/config');
const {uploadRoute}= require('../routes/uploadRoute')

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT || '3001';
        this.conectarDB();

        // Configuración de middlewares y rutas
        this.middlewares();
        this.routes();
    }

    async conectarDB() {
        await dbConnection();
    }

    middlewares() {
        this.app.use(express.static(path.join(__dirname, '..', 'public', 'index.html')));
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(fileUpload({
            useTempFiles : true,
            tempFileDir : '/tmp/',
            createParentPath : true
        }));
    }

    routes() {
        this.app.use('/api/auth', routerAuth);
        this.app.use('/upload',uploadRoute)  

        this.app.use('/getinclude', router );//Esta no funciona

        // Ruta para servir index.html
        this.app.get('/', (req, res) => {
            res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
        });    

        this.app.use('*', (req, res) => {  //default route cuando no se encuentra ninguna otra
            res.status(404).send('Not Found anything');
        });


    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Server on port ${this.port}`);
        });
    }
}

module.exports = Server;

//const server1 = new Server();
//server1.listen();
