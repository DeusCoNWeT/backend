'use strict'


var express = require('express');
var asyncMiddleware = require('../middlewares/async');
var ComponentController = require('../controllers/component.js');
const component = new ComponentController.component();
var validateId = require('../middlewares/validateObjectId')


var api = express.Router();



/**
 * Create a new component
 * @since 1.0
 * @name post/component
 * @param {string} body - The object insede the request
 * 
 * @returns {Object} Returns the new component.
 */
api.post('/components', asyncMiddleware(component.component_create
));

/**
 * Read collection of components
 * @since 1.0
 * @name get/component
 * @param {string} [name]  - Optional filters inside the request
 * @param {string} [directory]  - Optional filters inside the request
 * @param {string} [description]  - Optional filters inside the request
 * @param {string} [version]  - Optional filters inside the request
 * @param {string} [properties]  - Optional filters inside the request
 * 
 * @returns {Array} Returns the list of component.
 */
api.get('/components', asyncMiddleware(component.getComponent));

/**
 * Get by id component
 * @since 1.0
 * @name get/component
 * @param {string} id - Id of the resource.
 * 
 * @returns {Object} Returns component.
 */
api.get('/components/:id', validateId, asyncMiddleware(component.getComponentbyId));

/**
 * Upgrade component
 * @since 1.0
 * @name put/component
 * @param {string} body - The object insede the request
 * @param {string} id - Id of the resource.
 * 
 * @returns {Object} Returns upgrated component.
 */
api.put('/components/:id', validateId, asyncMiddleware(component.putComponent));


/**
 * Delete component
 * @since 1.0
 * @name delete/component
 * @param {string} id - Id of the resource.
 * 
 * @returns {Object} Returns message.
 */
api.delete('/components/:id', validateId, asyncMiddleware(component.deleteComponent));

/**
 * Controler to change the versions of the components
 * @since 1.0
 * @name get/componentBVA
 * 
 * @returns {Object} Returns upgradeted components.
 */
api.get('/componentsBVA', asyncMiddleware(component.BVA));

module.exports = api;