'use strict'

// Cargamos el módulo de mongoose
var mongoose =  require('mongoose');

// Usaremos los esquemas
var Schema = mongoose.Schema;

// Creamos el objeto del esquema y sus atributos
var dashboardSchema = Schema({
    component_1: {
        type: String,
        required: [true]
    },
    combination: [{
        id : String,
        property : String
         }]
});

// Exportamos el modelo para usarlo en otros ficheros
module.exports = mongoose.model('Dashboard', dashboardSchema);