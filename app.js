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
var domain=`/${conf.apiSubDomain}/${version}`;
//Configuramos bodyParser para que convierta el body de nuestras peticiones a JSON
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Cargamos las rutas
app.use(domain, component);
app.use(domain, user);
app.use(domain,analysis);
app.use(domain,dashboard);
app.use(domain,analyzer);
app.use('/', express.static('static'))
app.use(error);
// esto creo que no sirve de nada, no lo borro porque lo puso alguien antes que o pero vamos, el sabra lo que hace espero
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', 'http://127.0.0.1:8000');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Credentials", true)
  next();
});

// Ruta no espicificada

app.all('*', (req, res, next) => {
    var err = new Error('La ruta indicada no existe');
    err.status = 404;
    next(err);
  });
// exportamos
module.exports = app;
