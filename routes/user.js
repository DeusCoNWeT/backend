'use strict';

var express = require('express');


var UserController = require('../controllers/user');
const user = new UserController.user()


var api = express.Router();

var md_auth = require('../middlewares/authenticated');

api.get('/user/:id', md_auth.ensureAuth, user.getUser);


module.exports = api;