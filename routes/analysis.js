'use strict'


var express = require('express');
var asyncMiddleware = require('../middlewares/async');
var validateId=require('../middlewares/validateObjectId')

var AnalysisController = require('../controllers/analysis');


var api = express.Router();



// POST COMPONENT
api.post('/analysis/:fichero',asyncMiddleware(AnalysisController.writeF));


// Exportamos la configuración
module.exports = api;