'user strict';

var jwt = require('jwt-simple');
var moment = require('moment');
const conf=require('../config/data.json')
var secret = conf.secretKey;

exports.ensureAuth = function (req, res, next) {
    if (!req.headers.authorization) {
        return res.status(403).send({ message: 'La peticion no tiene la cabecera de autenticación' });
    } else {
        var token = req.headers.authorization.replace(/['"]+/g, '');

        try {
            var payload = jwt.decode(token, secret);

            if (payload.exp > moment().unix()) {
                return res.status(401).send({
                    message: 'EL token ha expirado'
                });
            }
        } catch (ex) {
            return res.status(404).send({
                message: 'EL token no es valido'
            });
        }

        req.user = payload;

        next();
    }
}