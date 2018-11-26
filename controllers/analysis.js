'use strict'

let fs = require('fs');

exports.writeF = async function (req, res) {
    var fichero=req.params.fichero
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

            if(dataAux.length!=null){
                dataAux.push(req.body)
                json = JSON.stringify(dataAux, null, 2);
                
            }else{
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










