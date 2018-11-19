var logger = require('../logger/logger.js')
const codes = function (tipo, res, crud, response, route) {
    switch (tipo) {
        case "200":
            res.status(200).send(response);
            logger.logger.info(`${crud} | ${route} | La petición de los recurso/s fue correcta | ${response} |`);
            break;

        case "200_PUT":
            res.status(200).send(response);
            logger.logger.info(`${crud} | ${route}/:id | El recurso se ha actualizado correctamente | ${response} |`);
            break;

        case "200_DEL":
            res.status(200).send({ message: 'Recurso borrado correctamente' });
            logger.logger.info(`${crud} | ${route}/:id | El recurso se ha borrado correctamente| ${response} |`);
            break;

        case "201":
            res.status(201).send(response);
            logger.logger.info(`${crud} | ${route} | El recurso se ha creado correctamente | ${response} |`);
            break;

        case "400":
            res.status(400).send({ message: 'Solicitud incorrecta. Los parámetros no son correctos' });
            logger.logger.error(`${crud}| ${route} | Los parámetros no son correctos | ${response}`);
            break;

        case "400_Body":
            res.status(400).send({ message: 'Solicitud incorrecta. Los campos del body no son correctos' });
            logger.logger.error(`${crud}| ${route} | Los campos del body no son correctos | ${response}`);
            break;

        case "400_Id":
            res.status(400).send({ message: 'Solicitud incorrecta. El id proporcionado no es correcto' });
            logger.logger.error(`${crud} | ${route} | El id proporcionado no es correcto | ${response}`);
            break;

        case "404":
            res.status(404).send({ message: 'Solicitud incorrecta. El recurso no existe' });
            logger.logger.error(`${crud} | ${route} | El recurso no existe | ${response}`);
            break;

        case "500":
            res.status(500).send({ message: 'Error interno del sistema' });
            logger.logger.error(`Se ha producido un error interno en el sistema | ${response}`);
            break;

        default:

    }
}
module.exports.codes = codes;