'use strict'


var express = require('express');
var asyncMiddleware = require('../middlewares/async');
var validateId=require('../middlewares/validateObjectId')

var AnalysisController = require('../controllers/analysis');


var api = express.Router();



// POST COMPONENT
api.post('/analysis/:fichero',asyncMiddleware(AnalysisController.writeF));
api.post('/analysisController',asyncMiddleware(AnalysisController.createAnalysis));

api.get('/analysis',asyncMiddleware(AnalysisController.getAnalysis));
api.get('/analysis/:id',validateId,asyncMiddleware(AnalysisController.getAnalysisId));
api.put('/analysis/:id',validateId,asyncMiddleware(AnalysisController.putAnalysis));
api.put('/analysisAdd/:id',validateId,asyncMiddleware(AnalysisController.addObject));
api.delete('/analysis/:id',validateId,asyncMiddleware(AnalysisController.deleteAnalysis));

// Exportamos la configuración
module.exports = api;