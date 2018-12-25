'use strict'


var express = require('express');
var asyncMiddleware = require('../middlewares/async');
// Cargamos el controlador
var ComponentController = require('../controllers/component.js');
const component = new ComponentController.component();
var validateId = require('../middlewares/validateObjectId')

// Llamamos al router
var api = express.Router();



// Creamos una ruta para los métodos que tenemos en nuestros controladores



// POST COMPONENT

api.post('/components', asyncMiddleware(component.component_create
));



// GET COMPONENT(Si le pasas parametros te permite buscar por los diferentes campos del componente)
//localhost:3800/api/component    (Devuelve todos los componentes de la colección)
//localhost:3800/api/component?name=prueba


api.get('/components', asyncMiddleware(component.getComponent));


//GET COMPONENT BY ID
api.get('/components/:id', validateId, asyncMiddleware(component.getComponentbyId));


//UPDATE COMPONENT

api.put('/components/:id', validateId, asyncMiddleware(component.putComponent));


//Delete
api.delete('/components/:id', validateId, asyncMiddleware(component.deleteComponent));

api.get('/componentsBVA', asyncMiddleware(component.BVA));

// Exportamos la configuración
module.exports = api;