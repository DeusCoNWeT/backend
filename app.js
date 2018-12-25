// Utilizar funcionalidades del Ecmascript 6
'use strict';

// Cargamos los módulos de express y body-parser
var express = require('express');
var bodyParser = require('body-parser');
var conf=require('./config/data.json');
// Llamamos a express para poder crear el servidor
var app = express();

// Importamos las rutas
var component = require('./routes/component');
var user = require('./routes/user');
var analysis=require('./routes/analysis');
var dashboard=require('./routes/dashboard');
var analyzer=require('./routes/polymer-analyzer');
const error=require('./middlewares/error');

var version=conf.versionAPI;
var domain=`/${conf.domain}/${version}/${conf.apiSubDomain}`;
//Configuramos bodyParser para que convierta el body de nuestras peticiones a JSON
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Cargamos las rutas
app.use(domain, component);
app.use(domain, user);
app.use(domain,analysis);
app.use(domain,dashboard);
app.use(domain,analyzer);
app.use(error);

// Ruta no espicificada

app.all('*', (req, res, next) => {
    var err = new Error('La ruta indicada no existe');
    err.status = 404;
    next(err);
  });
// exportamos
module.exports = app;
