'use strict'

let fs = require('fs');
var Analysis = require('../models/analysis');
var status = require('../middlewares/statusCodes.js');
var errorG = require('../middlewares/generalError.js');


exports.writeF = async function (req, res) {
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

exports.createAnalysis = async function (req, res) {
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


exports.getAnalysis = async function (req, res) {
    const { error } = Analysis.validateGet(req.query)
    if (error) {
        status.codes("400", res, req.method, error, req.url)
    } else {
        var search_key = req.query;

        var analysis = await Analysis.find(search_key);
        status.codes("200", res, req.method, analysis, req.url)
    }

};

exports.getAnalysisId = async function (req, res) {
    var analysisId = req.params.id;
    var bool;
    var analysis = await Analysis.findById(analysisId, (err, componen) => {
        bool = errorG.errorG(res, req.method, err, componen);
    });
    if (bool) {
        status.codes("200", res, req.method, analysis,  req.url)
    }


}

exports.putAnalysis = async function (req, res) {
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

exports.addObject = async function (req, res) {
    var analysisId = req.params.id;
    var body = req.body;
    var bool;
    const { error } = Analysis.validateGet(body)
    if (error) {
        status.codes("400_Body", res, req.method, error, req.url)
    } else {
        var analysis = await Analysis.findByIdAndUpdate(analysisId, { $push: {Objects: body.Objects} }, (err, componen) => {
            bool = errorG.errorG(res, req.method, err, componen);
        });
        console.log(analysis)
        if (bool) {
            status.codes("200_PUT", res, req.method, analysis, req.url)
        }

    }
};
exports.deleteAnalysis = async function (req, res) {
    var analysisId = req.params.id;
    var bool;
    await Analysis.findByIdAndDelete(analysisId, (err, componen) => {
        bool = errorG.errorG(res, req.method, err, componen);
    });
    if (bool) {
        status.codes("200_DEL", res, req.method, null, req.url)
    }

}








