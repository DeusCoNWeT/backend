'use strict'
var Component = require('../models/component');
var Dashboard = require('../models/dashboards');
var errorG = require('../middlewares/generalError.js');
var status = require('../middlewares/statusCodes.js')

exports.dashboard_create = async function (req, res) {
    var bool = true;
    var component_IDs = [];
    var i = 0;
    var objComb=[]
    const { error } = Dashboard.validate(req.body)
    if (error) {
        status.codes("400_Body", res, "POST", error, "/dashboard")
    } else {
        var long = req.body.combination.length;
        component_IDs.push(req.body.component_1);
        for (let i = 0; i < long; i++) {
            component_IDs.push(req.body.combination[i].id);
            objComb.push(req.body.combination[i])
        }
        while (bool && i < long) {
            await Component.findById(component_IDs[i], (err, dash) => {
                bool = errorG.errorG(res, "GET", err, dash);
            });
            i++;
        }
        if (bool) {
            let dashboard = new Dashboard(
                {
                    component_1: req.body.component_1,
                    combination: objComb

                }
            );
            await dashboard.save();
            status.codes("201", res, "POST", dashboard, "/dashboard")
        }
    }
};

exports.getDashboard = async function (req, res) {
    console.log(req.query)
    const { error } = Dashboard.validateGet(req.query)
    if (error) {
        status.codes("400", res, "GET", error, "/dashboard")
    } else {
        var search_key = req.query;

       var dashboard = await Dashboard.find(search_key);
       /*var dashboard = await Dashboard.find({combination: {$elemMatch:
            {
                id: {$exists: true},
                property: "campo1"
            }}});
*/
        status.codes("200", res, "GET", dashboard, "/dashboard")
    }
    

};

exports.getDashboardId = async function (req, res) {
    var connectionId = req.params.id;
    var bool;
    var dashboard = await Dashboard.findById(connectionId, (err, dash) => {
        bool = errorG.errorG(res, "GET", err, dash);
    });
    if (bool) {
        status.codes("200", res, "GET", dashboard, "/dashboard/:id")
    }


}
exports.deleteDashboard = async function (req, res) {
    var connectionId = req.params.id;
    var bool;
    await Dashboard.findByIdAndDelete(connectionId, (err, dash) => {
        bool = errorG.errorG(res, "DELETE", err, dash);
    });
    if (bool) {
        status.codes("200_DEL", res, "DELETE", null, "/dashboard")
    }

}

exports.putDashboard = async function (req, res) {
    var componentId = req.params.id;
    var body = req.body;
    var bool;
    var component_IDs = [];

    const { error } = Connection.validateGet(body)
    if (error) {
        status.codes("400_Body", res, "PUT", error, "/connection")
    } else {
        if(body.component_1) component_IDs.push(req.body.component_1);
        if(body.combination){
            var long = req.body.combination.length;
            for (let i = 0; i < long; i++) {
                if(req.body.combination[i].id){
                    component_IDs.push(req.body.combination[i].id);
                }
            }
            component_IDs.push(req.body.component_2);
        } 
        while (bool && i < component_IDs.length()) {
            await Component.findById(component_IDs[i], (err, dash) => {
                bool = errorG.errorG(res, "GET", err, dash);
            });
            i++;
        }
        if(bool){
            var dashboard = await Dashboard.findByIdAndUpdate(componentId, { $set: body }, (err, dash) => {
                bool = errorG.errorG(res, "PUT", err, dash);
            });
            if (bool) {
                status.codes("200_PUT", res, "PUT", dashboard, "/dashboard")
            }
    
        }
       
    }
};

