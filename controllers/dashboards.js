'use strict'
var Component = require('../models/component');
var Dashboard = require('../models/dashboards');
var handleR = require('./handlerResponse.js')
var conf = require('../config/data.json');
let versiones = conf.versions;

class dashboard extends handleR {
    constructor() {
        super()
    }
    async dashboard_create(req, res) {
        var bool = true;
        var component_IDs = [];
        var i = 0;
        var objComb = []
        const { error } = Dashboard.validate(req.body)
        if (error) {
            super.bodyNOK(res, req, error);
        } else {
            var long = req.body.combination.length;
            for (let i = 0; i < long; i++) {
                component_IDs.push(req.body.combination[i].id);
                objComb.push(req.body.combination[i])
            }
            while (bool && i < long) {
                await Component.findById(component_IDs[i], (err, dash) => {
                    bool = super.errorG(res, req, err, dash);
                });
                i++;
            }
            if (bool) {
                let dashboard = new Dashboard(
                    {
                        name: req.body.name,
                        combination: objComb,
                        version: req.body.version

                    }
                );
                // console.log(dashboard)
                await dashboard.save();
                super.postOK(res, req, dashboard);
            }
        }
    };

    async getDashboard(req, res) {
        console.log(req.query)
        const { error } = Dashboard.validateGet(req.query)
        if (error) {
            super.parametersNOK(res, req, error)
        } else {
            var search_key = req.query;

            var dashboard = await Dashboard.find(search_key);
            /*var dashboard = await Dashboard.find({combination: {$elemMatch:
                 {
                     id: {$exists: true},
                     property: "campo1"
                 }}});
     */
            super.getOK(res, req, dashboard)
        }


    };

    async BVA(req, res) {
        // cogemos la lista de versiones (en el fichero config.json), y cogemos la primera y la ponemos la ultima (BVA)
        // la que hemos sacado es la que le pasaremos al front
        let apoyo = conf.versions[0]
        // conf.versions.push(apoyo)

        // el resto del codigo es trivial (o eso supongo porque lo he copiado de lo que ya estaba hehe)
        var bool;
        var dashboard = await Dashboard.find(({ 'version': apoyo }), (err, dash) => {
            // conf.versions.unshift(apoyo)
            bool = super.errorG(res, req, err, dash);
        });
        if (bool) {
            let apoyo = conf.versions.shift()
            conf.versions.push(apoyo)
            super.getOK(res, req, dashboard)
        }


    };

    async getDashboardId(req, res) {
        var connectionId = req.params.id;
        var bool;
        var dashboard = await Dashboard.findById(connectionId, (err, dash) => {
            bool = super.errorG(res, req, err, dash);
        });
        if (bool) {
            super.getOK(res, req, dashboard)
        }


    }
    async deleteDashboard(req, res) {
        var connectionId = req.params.id;
        var bool;
        await Dashboard.findByIdAndDelete(connectionId, (err, dash) => {
            bool = super.errorG(res, req, err, dash)
        });
        if (bool) {
            super.deleteOK(res, req, null);
        }

    }

    async putDashboard(req, res) {
        var componentId = req.params.id;
        var body = req.body;
        var bool = true;
        var component_IDs = [];
        var j = 0;
        const { error } = Dashboard.validate(body)
        if (error) {
            super.bodyNOK(res, req, error)
        } else {
            if (body.combination) {
                var long = req.body.combination.length;
                for (let i = 0; i < long; i++) {
                    if (req.body.combination[i].id) {
                        component_IDs.push(req.body.combination[i].id);
                    }
                }
            }
            while (bool && j < component_IDs.length) {
                await Component.findById(component_IDs[j], (err, dash) => {
                    bool = super.errorG(res, req, err, dash);
                });
                j++;
            }
            if (bool) {
                var dashboard = await Dashboard.findByIdAndUpdate(componentId, { $set: body }, (err, dash) => {
                    bool = super.errorG(res, req, err, dash);
                });
                if (bool) {
                    super.putOK(res, req, dashboard);
                }

            }

        }
    };

}
module.exports.dashboard = dashboard;