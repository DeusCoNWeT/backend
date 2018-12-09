// Utilizar funcionalidades del Ecmascript 6
'use strict'

// Cargamos el módulo de mongoose para poder conectarnos a MongoDB
var mongoose = require('mongoose');

// *Cargamos el fichero app.js con la configuración de Express
var app = require('./app');

// Creamos la variable PORT para indicar el puerto en el que va a funcionar el servidor
const config= require('./config.json');

//Tomamos los valores del fichero de configuración
var conf=config.development;
var node_port = conf.node_port;
var mongo_conection=`:${conf.mongo_port}/${conf.database}`;
var listen= `${conf.direction}:${node_port}`;
// Le indicamos a Mongoose que haremos la conexión con Promesas
mongoose.Promise = global.Promise;


// Usamos el método connect para conectarnos a nuestra base de datos
if(process.env.NODE_ENV=="production"){
    mongo_conection= conf.directionProduction + mongo_conection;
}else{
    mongo_conection= conf.direction + mongo_conection;
}
mongoose.connect(`mongodb://${mongo_conection}`, { useNewUrlParser: true})
    .then(() => {
        // Cuando se realiza la conexión, lanzamos este mensaje por consola
        console.log("La conexión a la base de datos dashboards se ha realizado correctamente")
    
        // CREAR EL SERVIDOR WEB CON NODEJS
        app.listen(node_port, () => {
            console.log(`servidor corriendo en http://${listen}`);
        });
    })
    // Si no se conecta correctamente devolvemos el error
    .catch(err => console.log(err));

    /*
   var fs = require('fs');

    var key = fs.readFileSync('/etc/ssl/mongodb-cert.crt');
    var key2 = fs.readFileSync('/etc/ssl/mongodb-cert.key');
    var ca = [fs.readFileSync('/etc/ssl/mongodb.pem')];
    const options = {
            useNewUrlParser: true,
            sslValidate: true,
            sslCA: ca,
            sslKey: key2,
            sslCert:key,
            checkServerIdentity:false
    }
    
    mongoose.connect(`mongodb://${mongo_conection}?ssl=true`,options)
        .then(() => {
    
            // Cuando se realiza la conexión, lanzamos este mensaje por consola
            console.log("La conexión a la base de datos dashboards se ha realizado correctamente")
    
            // CREAR EL SERVIDOR WEB CON NODEJS
            app.listen(node_port, () => {
                console.log(`servidor corriendo en https://${listen}`);
            });
        })
        // Si no se conecta correctamente devolvemos el error
        .catch(err => console.log(err));
    */