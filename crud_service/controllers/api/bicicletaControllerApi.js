const Bicicleta = require("../../models/bicicleta.js");

exports.list = function (req, res) {
  Bicicleta.allBicis().then(data => {
    res.status(200).json({ bicicletas: data });
  })
};

exports.show = function (req, res) {
  Bicicleta.findById(req.params.id).then(data => {
    res.status(200).json(data)
  }).catch(err => {
    res.status(404).json({ message: err.message })
  })
}

exports.add = function (req, res) {
  var bici = new Bicicleta(req.body.id, req.body.color, req.body.modelo);
  bici.ubicacion = [req.body.lat, req.body.lng];
  Bicicleta.add(bici);
  res.status(201).json(`Bicicleta con id: ${req.body.id} Creado exitosamente`);
};

exports.update = function (req, res) {
  try {
    var bici = Bicicleta.findById(req.body.id);
    bici.id = req.body.id;
    bici.color = req.body.color;
    bici.modelo = req.body.modelo;
    bici.ubicacion = [req.body.lat, req.body.lng];
    res.status(201).json({ Bicicleta: bici });
  } catch (error) {
    res.status(404).json(error.message);
  }
};

exports.delete = function (req, res) {
  try {
    Bicicleta.removeById(req.body.id);
    res.status(204).json(`Bicicleta id: ${req.body.id} borrada exitosamente.`);
  } catch (error) {
    res.status(404).json(error.message);
  }
};
