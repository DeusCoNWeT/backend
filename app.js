// Utilizar funcionalidades del Ecmascript 6
'use strict';

// Cargamos los módulos de express y body-parser
var express = require('express');
var bodyParser = require('body-parser');

// Llamamos a express para poder crear el servidor
var app = express();

// Importamos las rutas
var component = require('./routes/component');
var user = require('./routes/user');
var connection = require('./routes/interconnection');
var analysis=require('./routes/analysis')
const error=require('./middlewares/error');
//Configuramos bodyParser para que convierta el body de nuestras peticiones a JSON
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Cargamos las rutas
app.use('/api', component);
app.use('/api', user);
app.use('/api',connection)
app.use('/api',analysis)
app.use(error);

// Ruta no espicificada

app.all('*', (req, res, next) => {
    var err = new Error('La ruta indicada no existe');
    err.status = 404;
    next(err);
  });
// exportamos
module.exports = app;
