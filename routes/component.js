'use strict';


var express = require('express');

// Cargamos el controlador
var ComponentController = require('../controllers/component');

// Llamamos al router
var api = express.Router();



// Creamos una ruta para los métodos que tenemos en nuestros controladores

// Get introductorio
api.get('/', function (response) {
    response.send('You made it to the home page.');
});


// POST COMPONENT
api.post('/components', ComponentController.component_create);



// GET COMPONENT(Si le pasas parametros te permite buscar por los diferentes campos del componente)
    //localhost:3800/api/component    (Devuelve todos los componentes de la colección)
    //localhost:3800/api/component?name=prueba

api.get('/components', ComponentController.getComponent);


//GET COMPONENT BY ID
api.get('/components/:id', ComponentController.getComponentbyId);


//UPDATE COMPONENT
api.put('/components/:id', ComponentController.putComponent);


//Delete
api.delete('/components/:id', ComponentController.deleteComponent);


api.get('/random', ComponentController.getRandomComponent);



// Exportamos la configuración
module.exports = api;