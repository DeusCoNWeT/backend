'user strict';


var status = require('../middlewares/statusCodes.js')
module.exports = function(err,req,res,next){
    //logger.logger.error(`Error interno del sistema ${err}`);
    //res.status(500).send('Error interno del sistema');
    status.codes("500", res, null, err, null)
}