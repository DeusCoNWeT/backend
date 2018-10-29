'use strict';


var mongoose =  require('mongoose');


var Schema = mongoose.Schema;

// Creamos el objeto del esquema de componentes y sus atributos
var componentSchema = new Schema({
    name: String,
    directory: String,
    description: String,
    version: String
});

// Exportamos el modelo para usarlo en otros ficheros
module.exports = mongoose.model('Component', componentSchema);