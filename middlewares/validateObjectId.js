const mongoose = require('mongoose');
var logger = require('../logger/logger.js');

module.exports = function (req, res, next) {

  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {

    logger.logger.error(`${req.method} | ${req.url} | El id proporcionado no es correcto `);
    return res.status(400).send({ message: 'Solicitud incorrecta. El id proporcionado no es correcto' });

  } else { next(); }


}