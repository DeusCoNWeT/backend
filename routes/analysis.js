'use strict'


var express = require('express');
var asyncMiddleware = require('../middlewares/async');
var AnalysisController = require('../controllers/analysis');
const analysis = new AnalysisController.analysis();

var validateId = require('../middlewares/validateObjectId')


var api = express.Router();



// POST COMPONENT
api.post('/analysisFile/:fichero', asyncMiddleware(analysis.writeF));
api.post('/analysis', asyncMiddleware(analysis.createAnalysis));

api.get('/analysis', asyncMiddleware(analysis.getAnalysis));
api.get('/analysis/:id', validateId, asyncMiddleware(analysis.getAnalysisId));
api.put('/analysis/:id', validateId, asyncMiddleware(analysis.putAnalysis));
api.put('/analysisAdd/:id', validateId, asyncMiddleware(analysis.addObject));
api.delete('/analysis/:id', validateId, asyncMiddleware(analysis.deleteAnalysis));

// Exportamos la configuración
module.exports = api;