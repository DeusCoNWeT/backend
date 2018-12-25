'use strict'

let fs = require('fs');
var Analysis = require('../models/analysis');
var handleR = require('./handlerResponse.js')

class analysis extends handleR {
    constructor() {
        super()
    }
    async writeF(req, res) {
        var fichero = req.params.fichero
        fs.readFile(fichero, 'utf8', function readFileCallback(err, data) {
            var obj = [];

            var json;
            if (err) {
                var data = JSON.stringify(req.body, null, 2);
                fs.appendFile(fichero, data, function (err) {
                    if (err) throw err;
                    console.log('Saved!');
                });
            } else {
                var dataAux = JSON.parse(data);

                if (dataAux.length != null) {
                    dataAux.push(req.body)
                    json = JSON.stringify(dataAux, null, 2);

                } else {
                    obj.push(dataAux);
                    obj.push(req.body);
                    json = JSON.stringify(obj, null, 2);
                }
                fs.writeFile(fichero, json, 'utf8', function (err) {
                    if (err) {
                        return console.log(err);
                    }
                    return console.log("success")
                });
                res.status(200).send({ message: 'Upgrade file' });
            }
        });

    };

    async createAnalysis(req, res) {
        const { error } = Analysis.validate(req.body)
        if (error) {
            super.bodyNOK(res, req, error);        } else {
            let analysis = new Analysis(
                {
                    Objects: req.body.Objects
                }
            );
            await analysis.save();
            super.postOK(res, req, analysis);        }
    }


    async getAnalysis(req, res) {
        const { error } = Analysis.validateGet(req.query)
        if (error) {
            super.parametersNOK(res, req, error)        } else {
            var search_key = req.query;

            var analysis = await Analysis.find(search_key);
            super.getOK(res, req, analysis)        }

    };

    async getAnalysisId(req, res) {
        var analysisId = req.params.id;
        var bool;
        var analysis = await Analysis.findById(analysisId, (err, componen) => {
            bool = super.errorG(res, req, err, componen);        });
        if (bool) {
            super.getOK(res, req, analysis)        }


    }

    async putAnalysis(req, res) {
        var analysisId = req.params.id;
        var body = req.body;
        var bool;

        const { error } = Analysis.validateGet(body)
        if (error) {
            super.bodyNOK(res, req, error)        } else {
            var analysis = await Analysis.findByIdAndUpdate(analysisId, { $set: body }, (err, componen) => {
                bool = super.errorG(res, req, err, componen);            });
            if (bool) {
                super.putOK(res, req, analysis);            }

        }
    };

    async addObject(req, res) {
        var analysisId = req.params.id;
        var body = req.body;
        var bool;
        const { error } = Analysis.validateGet(body)
        if (error) {
            super.bodyNOK(res, req, error);        } else {
            var analysis = await Analysis.findByIdAndUpdate(analysisId, { $push: { Objects: body.Objects } }, (err, componen) => {
                bool = super.errorG(res, req, err, componen);            });
            
            if (bool) {
                super.putOK(res, req, analysis);            }

        }
    };
    async deleteAnalysis(req, res) {
        var analysisId = req.params.id;
        var bool;
        await Analysis.findByIdAndDelete(analysisId, (err, componen) => {
            bool = super.errorG(res, req, err, componen)        });
        if (bool) {
            super.deleteOK(res, req, null);        }

    }
}

module.exports.analysis = analysis;





