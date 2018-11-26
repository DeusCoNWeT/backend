'use strict'

var Component = require('../models/component');
var validates = require('../middlewares/componentValidation.js');
var errorG = require('../middlewares/generalError.js');
var status = require('../middlewares/statusCodes.js')

exports.component_create = async function (req, res) {
    var propert = []
    const { error } = validates.validate(req.body)
    if (error) {
        status.codes("400_Body", res, "POST", error, "/components")
    } else {
        console.log(req.body.properties.name);
        propert.push()
        let component = new Component(
            {
                name: req.body.name,
                directory: req.body.directory,
                description: req.body.description,
                version: req.body.version,
                properties: {
                    name: req.body.properties.name,
                    Type: req.body.properties.Type,
                    inPut: req.body.properties.inPut,
                    outPut: req.body.properties.outPut,
                    Default: req.body.properties.Default
                }
            }
        );

        await component.save();
        status.codes("201", res, "POST", component, "/components")
    }


};

exports.getComponent = async function (req, res) {
    const { error } = validates.validateGet(req.query)
    if (error) {
        status.codes("400", res, "GET", error, "/components")
    } else {
        var search_key = req.query;

        var component = await Component.find(search_key);
        status.codes("200", res, "GET", component, "/components")
    }

};

exports.getComponentbyId = async function (req, res) {
    var componentId = req.params.id;
    var bool;
    var component = await Component.findById(componentId, (err, componen) => {
        bool = errorG.errorG(res, "GET", err, componen);
    });
    if (bool) {
        status.codes("200", res, "GET", component, "/components/:id")
    }


}

exports.putComponent = async function (req, res) {
    var componentId = req.params.id;
    var body = req.body;
    var bool;

    const { error } = validates.validateGet(body)
    if (error) {
        status.codes("400_Body", res, "PUT", error, "/components")
    } else {
        var component = await Component.findByIdAndUpdate(componentId, { $set: body }, (err, componen) => {
            bool = errorG.errorG(res, "PUT", err, componen);
        });
        if (bool) {
            status.codes("200_PUT", res, "PUT", component, "/components")
        }

    }
};



exports.deleteComponent = async function (req, res) {
    var componentId = req.params.id;
    var bool;
    await Component.findByIdAndDelete(componentId, (err, componen) => {
        bool = errorG.errorG(res, "DELETE", err, componen);
    });
    if (bool) {
        status.codes("200_DEL", res, "DELETE", null, "/components")
    }

}



//Metodo con random, analizando BVA
exports.getRandomComponent = function (req, res) {

    var count = Component.count();

    var random = Math.floor(Math.random() * 5)
    var count1 = 1;

    Component.findOne().skip(random).exec(
        function (err, result) {

            return res.status(200).send({ result });
        })


}







