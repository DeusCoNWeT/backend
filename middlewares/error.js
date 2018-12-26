'user strict';
var logger = require('../logger/logger.js');

module.exports = function(err,req,res,next){
    logger.logger.error(`Se ha producido un error interno en el sistema | ${err}`);
    res.status(500).send({ message: 'Error interno del sistema' });
            
}