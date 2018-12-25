'use strict'


var express = require('express');


var AnalyzerController = require('../controllers/polymer-analyzer');
const polymerAnalyzer = new AnalyzerController.polymerAnalyzer();

var api = express.Router();



// POST COMPONENT
api.post('/polymerAnalyzer', polymerAnalyzer.analyzer);


// Exportamos la configuración
module.exports = api;