'use strict'


var express = require('express');
var asyncMiddleware = require('../middlewares/async');
var validateId=require('../middlewares/validateObjectId')

var DashboardController = require('../controllers/dashboards');


var api = express.Router();



// Creamos una ruta para los métodos que tenemos en nuestros controladores


// POST COMPONENT
api.post('/dashboard',asyncMiddleware(DashboardController.dashboard_create));
api.get('/dashboard',asyncMiddleware(DashboardController.getDashboard));
api.get('/dashboard/:id',validateId,asyncMiddleware(DashboardController.getDashboardId));
api.put('/dashboard/:id',validateId,asyncMiddleware(DashboardController.putDashboard));
api.delete('/dashboard/:id',validateId,asyncMiddleware(DashboardController.deleteDashboard));

module.exports = api;