const axios = require("axios");

exports.list = function (req, res) {
  axios.get('http://back:3000/api/bicicletas').then(data => {
    const bicis = data.data.bicicletas || [];
    res.render("bicicletas/index", { bicis })
  }).catch(err => {
    res.send(err.message);
  });
};
exports.show = function (req, res) {
  axios.get(`http://back:3000/api/bicicletas/${req.params.id}`).then(data => {
    console.log(data.data);
    res.render("bicicletas/show", { bici: data.data });
  }).catch((err) => {
    res.status(404).send(err.message)
  });
};

exports.create_get = function (req, res) {
  res.render("bicicletas/create");
};

exports.create_post = function (req, res) {
  axios.post(`http://back:3000/api/bicicletas/create`, {
    id: req.body.id, color: req.body.color, modelo: req.body.modelo,
    lat: req.body.lat, ln: req.body.ln
  }).then(() => {
    res.redirect("/bicicletas");
  })
};

exports.update_get = function (req, res) {
  axios.get(`http://back:3000/api/bicicletas/${req.params.id}`).then(data => {
    res.render("bicicletas/update", { bici: data.data });
  });
};
exports.update_post = function (req, res) {
  axios.put(`http://back:3000/api/bicicletas/update`, {
    id: req.body.id, color: req.body.color, modelo: req.body.modelo,
    lat: req.body.lat, ln: req.body.ln
  }).then(data => {
    res.redirect("/bicicletas");
  })
};

exports.delete = function (req, res) {
  axios.delete(`http://back:3000/api/bicicletas/${req.body.id}/delete`).then(data => {
    res.redirect("/bicicletas");
  })
};
