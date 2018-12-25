'use strict'

let fs = require('fs');
var Analysis = require('../models/analysis');
var status = require('../middlewares/statusCodes.js');
var errorG = require('../middlewares/generalError.js');
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
            status.codes("400_Body", res, req.method, error, req.url)
        } else {
            let analysis = new Analysis(
                {
                    Objects: req.body.Objects
                }
            );
            await analysis.save();
            status.codes("201", res, req.method, analysis, req.url)
        }
    }


    async getAnalysis(req, res) {
        const { error } = Analysis.validateGet(req.query)
        if (error) {
            status.codes("400", res, req.method, error, req.url)
        } else {
            var search_key = req.query;

            var analysis = await Analysis.find(search_key);
            status.codes("200", res, req.method, analysis, req.url)
        }

    };

    async getAnalysisId(req, res) {
        var analysisId = req.params.id;
        var bool;
        var analysis = await Analysis.findById(analysisId, (err, componen) => {
            bool = errorG.errorG(res, req.method, err, componen);
        });
        if (bool) {
            status.codes("200", res, req.method, analysis, req.url)
        }


    }

    async putAnalysis(req, res) {
        var analysisId = req.params.id;
        var body = req.body;
        var bool;

        const { error } = Analysis.validateGet(body)
        if (error) {
            status.codes("400_Body", res, req.method, error, req.url)
        } else {
            var analysis = await Analysis.findByIdAndUpdate(analysisId, { $set: body }, (err, componen) => {
                bool = errorG.errorG(res, req.method, err, componen);
            });
            if (bool) {
                status.codes("200_PUT", res, req.method, analysis, req.url)
            }

        }
    };

    async addObject(req, res) {
        var analysisId = req.params.id;
        var body = req.body;
        var bool;
        const { error } = Analysis.validateGet(body)
        if (error) {
            status.codes("400_Body", res, req.method, error, req.url)
        } else {
            var analysis = await Analysis.findByIdAndUpdate(analysisId, { $push: { Objects: body.Objects } }, (err, componen) => {
                bool = errorG.errorG(res, req.method, err, componen);
            });
            console.log(analysis)
            if (bool) {
                status.codes("200_PUT", res, req.method, analysis, req.url)
            }

        }
    };
    async deleteAnalysis(req, res) {
        var analysisId = req.params.id;
        var bool;
        await Analysis.findByIdAndDelete(analysisId, (err, componen) => {
            bool = errorG.errorG(res, req.method, err, componen);
        });
        if (bool) {
            status.codes("200_DEL", res, req.method, null, req.url)
        }

    }
}

module.exports.analysis = analysis;





