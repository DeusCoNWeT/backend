'use strict'


var express = require('express');
var asyncMiddleware = require('../middlewares/async');
var validateId = require('../middlewares/validateObjectId')

var DashboardController = require('../controllers/dashboards');
const dashboard = new DashboardController.dashboard()

var api = express.Router();



// Creamos una ruta para los métodos que tenemos en nuestros controladores


// POST COMPONENT
api.post('/dashboard', asyncMiddleware(dashboard.dashboard_create));
api.get('/dashboard', asyncMiddleware(dashboard.getDashboard));
api.get('/dashboard/:id', validateId, asyncMiddleware(dashboard.getDashboardId));
api.put('/dashboard/:id', validateId, asyncMiddleware(dashboard.putDashboard));
api.delete('/dashboard/:id', validateId, asyncMiddleware(dashboard.deleteDashboard));

module.exports = api;