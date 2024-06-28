
//server.js
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const router = require('../routes/users');

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT || '3001';
        this.usuariosPath = '/api/usuarios';

        // Configuración de middlewares y rutas
        this.middlewares();
        this.routes();

    }

    middlewares() {
        this.app.use(express.static('public'));
        this.app.use(cors());

        this.app.use(express.json());
    }

    routes() {
        this.app.use(this.usuariosPath, router);
        this.app.use('*', (req,res)=>{
            res.send('Not Found anything');
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
