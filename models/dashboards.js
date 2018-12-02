'use strict'

// Cargamos el módulo de mongoose
var mongoose =  require('mongoose');
const Joi = require('joi')
// Usaremos los esquemas
var Schema = mongoose.Schema;

// Creamos el objeto del esquema y sus atributos
var dashboardSchema = Schema({
    component_1: {
        type: String,
        required: [true]
    },
    combination: [{
       _id : false ,
        id : String,
        property : String
         }]
});


const validate=function validateComponent(compo){
    const schema ={
        component_1: Joi.string().required(),
        combination: Joi.array().items({
            id: Joi.string().required(),
            property: Joi.string().required()
    })
    };
    return Joi.validate(compo,schema)
  }
  const validateGet=function validateComponent(compo){
    const schema ={
      component_1: Joi.string(),
      combination: Joi.array().items({
        id: Joi.string(),
        property: Joi.string()
})
    };
    return Joi.validate(compo,schema)
  }


// Exportamos el modelo para usarlo en otros ficheros
module.exports = mongoose.model('Dashboard', dashboardSchema);

module.exports.validate=validate;
module.exports.validateGet=validateGet;