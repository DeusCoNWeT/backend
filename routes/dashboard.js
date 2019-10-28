'use strict'


var express = require('express');
var asyncMiddleware = require('../middlewares/async');
var validateId = require('../middlewares/validateObjectId')

var DashboardController = require('../controllers/dashboards');
const dashboard = new DashboardController.dashboard()

var api = express.Router();
api.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://127.0.0.1:8000');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header("Access-Control-Allow-Credentials", true)
    next();
  });
api.use(require('cookie-parser')());
// api.use(require('express-session')());
// var session = require('express-session');

// Creamos una ruta para los métodos que tenemos en nuestros controladores


/**
 * Create dashboard document
 * @since 1.0
 * @name post/dashboards
 * @param {string} body - The object insede the request
 * 
 * @returns {Object} Returns the new dashboards.
 */
api.post('/dashboards', asyncMiddleware(dashboard.dashboard_create));

/**
 * Read collection of dashboards
 * @since 1.0
 * @name get/dashboards
 * @param {string} [component_1]  - Optional filters inside the request
 * @param {string} [combination]  - Optional filters inside the request
 * 
 * @returns {Array} Returns the list of dashboards.
 */
api.get('/dashboards', asyncMiddleware(dashboard.getDashboard));

/**
 * Get by id dashboards
 * @since 1.0
 * @name get/dashboards
 * @param {string} id - Id of the resource.
 * 
 * @returns {Object} Returns dashboards.
 */
api.get('/dashboards/:id', validateId, asyncMiddleware(dashboard.getDashboardId));

/**
 * Upgrade dashboards
 * @since 1.0
 * @name put/dashboards
 * @param {string} body - The object insede the request
 * @param {string} id - Id of the resource.
 * 
 * @returns {Object} Returns upgrated dashboards.
 */
api.put('/dashboards/:id', validateId, asyncMiddleware(dashboard.putDashboard));

/**
 * Delete dashboards
 * @since 1.0
 * @name delete/dashboards
 * @param {string} id - Id of the resource.
 * 
 * @returns {Object} Returns message.
 */
api.delete('/dashboards/:id', validateId, asyncMiddleware(dashboard.deleteDashboard));

/**
 * get a version of each dashboards
 * @since 1.0
 * @name get/dashboardsBVA
 * 
 * 
 * @returns {Array} Returns the list of dashboards.
 */
api.get('/dashboardsBVA', asyncMiddleware(dashboard.BVA));

module.exports = api;