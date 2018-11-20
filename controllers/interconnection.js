'use strict'

var Connection = require('../models/interconnection');
var Component = require('../models/component');
var errorG = require('../middlewares/generalError.js');
var status = require('../middlewares/statusCodes.js')

exports.connection_create = async function (req, res) {
    var component_IDs = [];
    var bool = true;
    let i = 0;
    const { error } = Connection.validate(req.body)
    if (error) {
        status.codes("400_Body", res, "POST", error, "/connection")
    } else {
        component_IDs.push(req.body.component_1);
        component_IDs.push(req.body.component_2);
        while (bool && i < 2) {
            await Component.findById(component_IDs[i], (err, componen) => {
                bool = errorG.errorG(res, "GET", err, componen);
            });
            i++;
        }

        if (bool) {
    
            let connection = new Connection(
                {
                    component_1: req.body.component_1,
                    component_2: req.body.component_2,
                    valor: req.body.valor

                }
            );
            await connection.save();
            status.codes("201", res, "POST", connection, "/connection")
        }

    }


};

exports.getConnection = async function (req, res) {
    const { error } = Connection.validateGet(req.query)
    if (error) {
        status.codes("400", res, "GET", error, "/connection")
    } else {
        var search_key = req.query;

        var connection = await Connection.find(search_key);
        status.codes("200", res, "GET", connection, "/connection")
    }

};

exports.getConnectionbyId = async function (req, res) {
    var connectionId = req.params.id;
    var bool;
    var connection = await Connection.findById(connectionId, (err, componen) => {
        bool = errorG.errorG(res, "GET", err, componen);
    });
    if (bool) {
        status.codes("200", res, "GET", connection, "/connection/:id")
    }


}

exports.putConnection = async function (req, res) {
    var componentId = req.params.id;
    var body = req.body;
    var bool;
    var component_IDs = [];

    const { error } = Connection.validateGet(body)
    if (error) {
        status.codes("400_Body", res, "PUT", error, "/connection")
    } else {
        if(body.component_1) component_IDs.push(req.body.component_1);
        if(body.component_2) component_IDs.push(req.body.component_2);
        while (bool && i < component_IDs.length()) {
            await Component.findById(component_IDs[i], (err, componen) => {
                bool = errorG.errorG(res, "GET", err, componen);
            });
            i++;
        }
        if(bool){
            var connection = await Connection.findByIdAndUpdate(componentId, { $set: body }, (err, componen) => {
                bool = errorG.errorG(res, "PUT", err, componen);
            });
            if (bool) {
                status.codes("200_PUT", res, "PUT", connection, "/connection")
            }
    
        }
       
    }
};



exports.deleteConnection = async function (req, res) {
    var connectionId = req.params.id;
    var bool;
    await Connection.findByIdAndDelete(connectionId, (err, componen) => {
        bool = errorG.errorG(res, "DELETE", err, componen);
    });
    if (bool) {
        status.codes("200_DEL", res, "DELETE", null, "/connection")
    }

}










