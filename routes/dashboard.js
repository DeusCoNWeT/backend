'use strict'


var express = require('express');
var asyncMiddleware = require('../middlewares/async');

var DashboardController = require('../controllers/dashboards');


var api = express.Router();



// Creamos una ruta para los métodos que tenemos en nuestros controladores


// POST COMPONENT
api.post('/dashboard',asyncMiddleware(DashboardController.dashboard_create));
api.get('/dashboard',asyncMiddleware(DashboardController.getDashboard));
api.get('/dashboard/:id',asyncMiddleware(DashboardController.getDashboardId));
api.put('/dashboard/:id',asyncMiddleware(DashboardController.putDashboard));
api.delete('/dashboard/:id',asyncMiddleware(DashboardController.deleteDashboard));

module.exports = api;