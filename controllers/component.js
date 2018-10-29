'use strict';

// Cargamos los modelos para usarlos posteriormente
var Component = require('../models/component');




exports.component_create = function (req, res) {
    var component = new Component(
        {
            name: req.body.name,
            directory: req.body.directory,
            description: req.body.description,
            version: req.body.version

        }
    );

    component.save(function (err) {
        if (err) {
            return res.status(500).send({ message: 'Error en la petición1' });
        }
        return res.status(201).send({ component });
    });
};


exports.getComponentbyId = function (req, res) {

    var componentId = req.params.id;


    //buscar un documento por un  id
    Component.findById(componentId, (err, component) => {
        if (err) return res.status(500).send({ message: 'Error en la petición1' });

        if (!component) return res.status(404).send({ message: 'EL componente no existe' });

        return res.status(200).send({ component });

    });
}

exports.getComponent = function (req, res) {//your code here

    var search_key = req.query;

    Component.find(search_key, function (err, component) {
        if (err) return res.status(500).send({ message: 'Error en la petición1' });

        if (!component) return res.status(404).send({ message: 'EL componente no existe' });

        return res.status(200).send({ component });
    });
};

exports.putComponent = function (req, res) {

    var componentId = req.params.id;

    Component.findOneAndUpdate(componentId, { $set: req.body }, function (err, component) {
        if (err) return res.status(500).send({ message: 'Error en la petición1' });
        return res.status(200).send({ component });
    });
};




exports.deleteComponent = function (req, res) {
    var componentId = req.params.id;
    Component.findByIdAndRemove(componentId, function (err) {
        if (err) return res.status(204).send({ message: 'No content' });
        return res.status(200).send({ message: 'Deleted successfully!' });

    })
};



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







