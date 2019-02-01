'use strict'


var express = require('express');


var AnalyzerController = require('../controllers/polymer-analyzer');
const polymerAnalyzer = new AnalyzerController.polymerAnalyzer();

var api = express.Router();



/**
 * Analize html component
 * @since 1.0
 * @name post/polymerAnalyzer
 * @param {string} body - The object insede the request to be analized
 * 
 * @returns {Object} Returns a message.
 */
api.post('/polymerAnalyzer', polymerAnalyzer.analyzer);

module.exports = api;