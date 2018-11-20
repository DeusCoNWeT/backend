'use strict'

// Cargamos el módulo de mongoose
var mongoose = require('mongoose');

// Usaremos los esquemas
var Schema = mongoose.Schema;

// Creamos el objeto del esquema y sus atributos
var interconnectionSchema = Schema({
    component_1: {
        type: String,
        required: [true]
    },
    component_2: {
        type: String,
        required: [true]
    },
    valor: {
        type: String,
        required: [true]
    }
});

const Joi = require('joi')
const validate = function validateConnection(compo) {
    const schema = {
        component_1: Joi.string().required(),
        component_2: Joi.string().required(),
        valor: Joi.string().required()
     
    };
    return Joi.validate(compo, schema)
}
const validateGet = function validateConnectionGET(compo) {
    const schema = {
        component_1: Joi.string(),
        component_2: Joi.string(),
        valor: Joi.string(),
    };
    return Joi.validate(compo, schema)
}



// Exportamos el modelo para usarlo en otros ficheros
module.exports = mongoose.model('Interconnection', interconnectionSchema);
module.exports.validate=validate;
module.exports.validateGet=validateGet;