'use strict'


var express = require('express');
var asyncMiddleware = require('../middlewares/async');
// Cargamos el controlador
var ConnectionController = require('../controllers/interconnection');

// Llamamos al router
var api = express.Router();



// Creamos una ruta para los métodos que tenemos en nuestros controladores


// POST COMPONENT
api.post('/connection',asyncMiddleware(ConnectionController.connection_create));



// GET COMPONENT(Si le pasas parametros te permite buscar por los diferentes campos del componente)
    //localhost:3800/api/component    (Devuelve todos los componentes de la colección)
    //localhost:3800/api/component?name=prueba

api.get('/connection', asyncMiddleware(ConnectionController.getConnection));


//GET COMPONENT BY ID
api.get('/connection/:id', asyncMiddleware(ConnectionController.getConnectionbyId));


//UPDATE COMPONENT
api.put('/connection/:id', asyncMiddleware(ConnectionController.putConnection));


//Delete
api.delete('/connection/:id',asyncMiddleware(ConnectionController.deleteConnection));




// Exportamos la configuración
module.exports = api;