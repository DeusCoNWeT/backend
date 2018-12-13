'use strict'


var express = require('express');


var AnalyzerController = require('../controllers/polymer-analyzer');


var api = express.Router();



// POST COMPONENT
api.post('/polymerAnalyzer',AnalyzerController.analyzer);


// Exportamos la configuración
module.exports = api;