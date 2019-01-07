'use strict'


var express = require('express');
var asyncMiddleware = require('../middlewares/async');
var AnalysisController = require('../controllers/analysis');
const analysis = new AnalysisController.analysis();

var validateId = require('../middlewares/validateObjectId')


var api = express.Router();



/**
 * Create or add object to file
 * @since 1.0
 * @name post/analysisFile
 * @param {string} fichero - Name of the file
 * @param {string} body - The object insede the request
 * 
 * @returns {Object} Returns message.
 */
api.post('/analysisFile/:fichero', asyncMiddleware(analysis.writeF));

/**
 * Create analysis document
 * @since 1.0
 * @name post/analysis
 * @param {string} body - The object insede the request
 * 
 * @returns {Object} Returns the new analysis.
 */
api.post('/analysis', asyncMiddleware(analysis.createAnalysis));

/**
 * Read collection of analysis
 * @since 1.0
 * @name get/analysis
 * @param {string} [name]  - Optional filters inside the request
 * @param {string} [Objects]  - Optional filters inside the request
 * 
 * @returns {Array} Returns the list of analysuçis.
 */
api.get('/analysis', asyncMiddleware(analysis.getAnalysis));

/**
 * Get by id analysis
 * @since 1.0
 * @name get/analysis
 * @param {string} id - Id of the resource.
 * 
 * @returns {Object} Returns analysis.
 */
api.get('/analysis/:id', validateId, asyncMiddleware(analysis.getAnalysisId));

/**
 * Upgrade analysis
 * @since 1.0
 * @name put/analysis
 * @param {string} body - The object insede the request
 * @param {string} id - Id of the resource.
 * 
 * @returns {Object} Returns upgrated analysis.
 */
api.put('/analysis/:id', validateId, asyncMiddleware(analysis.putAnalysis));

/**
 * Upgrade field of analysis
 * @since 1.0
 * @name put/analysis
 * @param {string} body - The object insede the request
 * @param {string} id - Id of the resource.
 * 
 * @returns {Object} Returns upgrated analysis.
 */
api.put('/analysisAdd/:id', validateId, asyncMiddleware(analysis.addObject));

/**
 * Delete component
 * @since 1.0
 * @name delete/analysis
 * @param {string} id - Id of the resource.
 * 
 * @returns {Object} Returns message.
 */
api.delete('/analysis/:id', validateId, asyncMiddleware(analysis.deleteAnalysis));

module.exports = api;