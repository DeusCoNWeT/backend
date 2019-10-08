'use strict'

// Cargamos el módulo de mongoose
var mongoose = require('mongoose');
const Joi = require('joi')
// Usaremos los esquemas
var Schema = mongoose.Schema;

// Creamos el objeto del esquema y sus atributos
var dashboardSchema = Schema({
  name: {
    type: String,
    required: [true]
  },
  combination: [{
    _id: false,
    id: String,
    nombre: String,
    property: String
  }],
  version:{
    type: String,
    required: [true]
  }
});


const validate = function validateComponent(compo) {
  const schema = {
    name: Joi.string().required(),
    combination: Joi.array().items({
      id: Joi.string().required(),
      nombre: Joi.string().required(),
      property: Joi.string().required()
    }),
    version: Joi.string().required()
  };
  return Joi.validate(compo, schema)
}
const validateGet = function validateComponent(compo) {
  const schema = {
    name: Joi.string(),
    combination: Joi.array().items({
      id: Joi.string(),
      nombre: Joi.string().required(),
      property: Joi.string()
    }),
    version: Joi.string()
  };
  return Joi.validate(compo, schema)
}


// Exportamos el modelo para usarlo en otros ficheros
module.exports = mongoose.model('Dashboard', dashboardSchema);

module.exports.validate = validate;
module.exports.validateGet = validateGet;