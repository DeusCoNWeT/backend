var logger = require('../logger/logger.js');

module.exports = class handlerResponse {
    constructor() {
    }
    getOK(res, req, response) {
        res.status(200).send(response);
        logger.logger.info(`${req.method} | ${req.url} | La petición de los recurso/s fue correcta | ${response} |`);
    }
    parametersNOK(res, req, response) {
        res.status(400).send({ message: 'Solicitud incorrecta. Los parámetros no son correctos' });
        logger.logger.error(`${req.method} | ${req.url} | Los parámetros no son correctos | ${response}`);
    }
    deleteOK(res, req, response) {
        res.status(200).send({ message: 'Recurso borrado correctamente' });
        logger.logger.info(`${req.method} | ${req.url} | El recurso se ha borrado correctamente| ${response} |`);
    }
    putOK(res, req, response) {
        res.status(200).send(response);
        logger.logger.info(`${req.method} | ${req.url} | El recurso se ha actualizado correctamente | ${response} |`);
    }
    bodyNOK(res, req, response) {
        res.status(400).send({ message: 'Solicitud incorrecta. Los campos del body no son correctos' });
        logger.logger.error(`${req.method} | ${req.url} | Los campos del body no son correctos | ${response}`);
    }
    postOK(res, req, response) {
        res.status(201).send(response);
        logger.logger.info(`${req.method} | ${req.url} | El recurso se ha creado correctamente | ${response} |`);

    }


    errorG(res, req, err, component) {
        if (err) {
            res.status(500).send({ message: 'Error interno del sistema' });
            logger.logger.error(`Se ha producido un error interno en el sistema | ${response}`);
            return false;
        } else if (!component) {
            res.status(404).send({ message: 'Solicitud incorrecta. El recurso no existe' });
            logger.logger.error(`${req.method} | ${req.url} | El recurso no existe `);
            return false;
        }
        return true;
    }
}
