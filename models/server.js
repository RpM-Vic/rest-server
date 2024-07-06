
//server.js
const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const router = require('../routes/users');
const routerAuth = require('../routes/authRoutes');
const { dbConnection } = require('../database/config');
const Usuario = require('../models/oneUser');

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT || '3001';
        this.usuariosPath = '/api/usuarios';
        this.authPath = '/api/auth';

        this.conectarDB();

        // Configuración de middlewares y rutas
        this.middlewares();
        this.routes();
    }

    async conectarDB() {
        await dbConnection();
    }

    middlewares() {
        this.app.use(express.static('public'));
        this.app.use(cors());
        this.app.use(express.json());
    }

    routes() {
        this.app.use(this.authPath, routerAuth);
        this.app.use(this.usuariosPath, router);

        this.app.get('/getinclude/:coleccion/:termino1?/:termino2?', async (req, res) => {
            const { coleccion, termino1, termino2 } = req.params;
        
            const conditions = [];
        
            if (termino1) {
                conditions.push({ [coleccion]: { $regex: termino1, $options: 'i' } });
            }
        
            if (termino2) {
                conditions.push({ [coleccion]: { $regex: termino2, $options: 'i' } });
            }
        
            try {
                const query = { estado: true };
        
                if (conditions.length > 0) {
                    query.$and = conditions;
                }
        
                const usuarios = await Usuario.find(query);
                res.json({
                    usuarios
                });
            } catch (error) {
                res.status(500).json({
                    msg: 'Error en el servidor',
                    error
                });
            }
        });

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
