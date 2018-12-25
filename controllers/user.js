'use strict';


var User = require('../models/user');


var handleR = require('./handlerResponse.js')

class user extends handleR {
    constructor() {
        super()
    }
    async getUser(req, res) {
        var userId = req.params.id;


        User.findById(userId, (err, user) => {
            if (err) return res.status(500).send({ message: 'Error en la petición' });

            if (!user) return res.status(404).send({ message: 'EL usuario no existe' });

            return res.status(200).send({ user });

        });
    }
}
module.exports.user = user;