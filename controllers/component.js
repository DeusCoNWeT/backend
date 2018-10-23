'use strict'

// Cargamos los modelos para usarlos posteriormente
var Component = require('../models/component');


// Conseguir datos de un usuario


exports.component_create = function (req, res) {
    let component = new Component(
        {
            name: req.body.name,
            directory: req.body.directory,
            description: req.body.description,
            version: req.body.version

        }
    );

    component.save(function (err) {
        if (err) {
            return next(err);
        }
        res.send('Component Created successfully')
    })
};


exports.getComponentbyId = function (req, res) {//your code here

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

    //var query=['search_key']
    Component.find(search_key, function (err, component) {
        if (err)
            return res.send(err);

        return res.status(200).send({ component });
    });
};

exports.putComponent = function (req, res) {//your code here

    var componentId = req.params.id;

    Component.findOneAndUpdate(componentId, {$set: req.body}, function (err, component) {
        if (err) return next(err);
        res.send('Component udpated.');
    });
};




exports.deleteComponent = function (req, res) {
    var componentId = req.params.id;
    Component.findByIdAndRemove(componentId, function (err) {
        if (err) return next(err);
        res.send('Deleted successfully!');
    })
};

exports.getRandomComponent = function (req, res) {//your code here
// Get the count of all users
var count= Component.count();

var random = Math.floor(Math.random() * 5)
var count1=1;
  // Again query all users but only fetch one offset by our random #
  Component.findOne().skip(random).exec(
    function (err, result) {
      // Tada! random user
      return res.status(200).send({result});
    })


}







