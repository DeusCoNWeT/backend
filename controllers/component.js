'use strict'

var Component = require('../models/component');
const BVA = require('../models/bva.js');
const bva = new BVA.BVA();
var handleR = require('./handlerResponse.js')

class component extends handleR {
    constructor() {
        super()
    }
    async component_create(req, res) {
        const { error } = Component.validate(req.body)
        if (error) {
            super.bodyNOK(res, req, error);
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
            super.postOK(res, req, component);
        }


    };

    async getComponent(req, res) {
        const { error } = Component.validateGet(req.query)
        if (error) {
            super.parametersNOK(res, req, component)
        } else {
            var search_key = req.query;

            var component = await Component.find(search_key);
            super.getOK(res, req, component)

        }

    };

    async getComponentbyId(req, res) {
        var componentId = req.params.id;
        var bool;
        var component = await Component.findById(componentId, (err, componen) => {
            bool = super.errorG(res, req, err, componen);
        });
        if (bool) {
            super.getOK(res, req, component)
        }


    }

    async putComponent(req, res) {
        var componentId = req.params.id;
        var body = req.body;
        var bool;

        const { error } = Component.validateGet(body)
        if (error) {
            super.bodyNOK(res, req, error)
        } else {
            var component = await Component.findByIdAndUpdate(componentId, { $set: body }, (err, componen) => {
                bool = super.errorG(res, req, err, componen);
            });
            if (bool) {
                super.putOK(res, req, component);
            }
        }
    };



    async deleteComponent(req, res) {
        var componentId = req.params.id;
        var bool;
        await Component.findByIdAndDelete(componentId, (err, componen) => {
            bool = super.errorG(res, req, err, componen)
        });
        if (bool) {
            super.deleteOK(res, req, null);
        }

    }



    async BVA(req, res) {

        var newComponents = [];
        var component = bva.allComponents
        var versions = bva.getNewVersion(req.params.time);
        var i = 0;
        for (let j = 0; j < component.length; j++) {
            var vers = component[j].directory.split('-')
            var newDirectory = vers[0] + "-" + versions[i]


            var updateObject = {
                version: versions[i],
                directory: newDirectory
            }

            var component2 = await Component.findByIdAndUpdate(component[j].id, { $set: updateObject })
            newComponents.push(component2)

        }
        super.getOK(res, req, newComponents)
    }
}
module.exports.component = component;