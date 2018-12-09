'use strict'

// Cargamos el módulo de mongoose
var mongoose = require('mongoose');
const Joi = require('joi')
// Usaremos los esquemas
var Schema = mongoose.Schema;

// Creamos el objeto del esquema y sus atributos
var analysischema = Schema({
    Objects: [{
        _id: false,
        object: {
        },
        Type: String
    }]
});

const validate = function validateComponent(compo) {
    const schema = {
        Objects: Joi.array().items({
            object: Joi.object().required(),
            Type: Joi.string().required()
        })
    };
    return Joi.validate(compo, schema)
}
const validateGet = function validateComponent(compo) {
    const schema = {
        Objects: Joi.array().items({
            object: Joi.object(),
            Type: Joi.string()
        })
    };
    return Joi.validate(compo, schema)
}

module.exports = mongoose.model('Analysis', analysischema);
module.exports.validate = validate;
module.exports.validateGet = validateGet;