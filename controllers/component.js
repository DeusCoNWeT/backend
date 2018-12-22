'use strict'

var Component = require('../models/component');
var errorG = require('../middlewares/generalError.js');
var status = require('../middlewares/statusCodes.js')
const BVA = require('../models/bva.js');
const bva = new BVA.BVA();


exports.component_create = async function (req, res) {
    var propert = []
    const { error } = Component.validate(req.body)
    if (error) {
        status.codes("400_Body", res, req.method, error, req.url)
    } else {

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
        status.codes("201", res, req.method, component, req.url)
    }


};

exports.getComponent = async function (req, res) {
    const { error } = Component.validateGet(req.query)
    if (error) {
        status.codes("400", res, req.method, error, req.url)
    } else {
        var search_key = req.query;

        var component = await Component.find(search_key);
        status.codes("200", res, req.method, component, req.url)
    }

};

exports.getComponentbyId = async function (req, res) {
    var componentId = req.params.id;
    var bool;
    var component = await Component.findById(componentId, (err, componen) => {
        bool = errorG.errorG(res, req.method, err, componen);
    });
    if (bool) {
        status.codes("200", res, req.method, component, req.url)
    }


}

exports.putComponent = async function (req, res) {
    var componentId = req.params.id;
    var body = req.body;
    var bool;

    const { error } = Component.validateGet(body)
    if (error) {
        status.codes("400_Body", res, req.method, error, req.url)
    } else {
        var component = await Component.findByIdAndUpdate(componentId, { $set: body }, (err, componen) => {
            bool = errorG.errorG(res, req.method, err, componen);
        });
        if (bool) {
            status.codes("200_PUT", res, req.method, component, req.url)
        }

    }
};



exports.deleteComponent = async function (req, res) {
    var componentId = req.params.id;
    var bool;
    await Component.findByIdAndDelete(componentId, (err, componen) => {
        bool = errorG.errorG(res, req.method, err, componen);
    });
    if (bool) {
        status.codes("200_DEL", res, req.method, null, req.url)
    }

}



exports.BVA = async function (req, res) {

    var newComponents=[];
    var component = bva.allComponents
    var versions = bva.getNewVersion();
    var i = 0;
    for (let j = 0; j < component.length; j++) {
        console.log(component[j].directory)
        var vers = component[j].directory.split('-')
        var newDirectory = vers[0] + "-" + versions[i]


        var updateObject = {
            version: versions[i],
            directory: newDirectory
        }

        var component2 = await Component.findByIdAndUpdate(component[j].id, { $set: updateObject })
        newComponents.push(component2)        

    }

    status.codes("200", res, req.method, newComponents, req.url)
}