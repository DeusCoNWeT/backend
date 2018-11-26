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
  },
  properties:{
    name: String,
    Type: String,
    inPut:String,
    outPut:String,
    Default:String
  }
});


module.exports = mongoose.model('Component', componentSchema);
