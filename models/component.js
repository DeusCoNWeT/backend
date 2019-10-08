'use strict'


var mongoose = require('mongoose');
var Joi = require('joi')

var Schema = mongoose.Schema;

// Creamos el objeto del esquema de componentes y sus atributos
var componentSchema = Schema({
  name: {
    type: String,
    required: [true]
  },
  directory: {
    type: String,
    required: [true]
  },
  description: {
    type: String,
    required: [true]
  },
  version: {
    type: String,
    required: [true]
  }

});

const validate=function validateComponent(compo){
    const schema ={
      name: Joi.string().required(),
      directory: Joi.string().required(),
      description: Joi.string().required(),
      version: Joi.string().required()
    };
    return Joi.validate(compo,schema)
  }
  const validateGet=function validateComponent(compo){
    const schema ={
      name: Joi.string(),
      directory: Joi.string(),
      description: Joi.string(),
      version: Joi.string()
    };
    return Joi.validate(compo,schema)
  }



module.exports = mongoose.model('Component', componentSchema);
module.exports.validate=validate;
module.exports.validateGet=validateGet;