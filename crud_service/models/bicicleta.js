var sqlite3 = require('sqlite3').verbose();
let db = new sqlite3.Database('bicicletas.db', (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Connected to the bicicletas database.');
});

let Bicicleta = function (id, color, modelo, latitud, longitud) {
  this.id = id;
  this.color = color;
  this.modelo = modelo;
  this.latitud = latitud;
  this.longitud = longitud;
};
Bicicleta.prototype.toString = function () {
  return `id: ${this.id} | color: ${this.color}`;
};

Bicicleta.allBicis = function () {
  return new Promise((resolve, reject) => {
    db.all("SELECT * FROM Bicicletas", function(err, rows) {
      var newRows = rows.map((x)=>({
        id: x.id,
        modelo: x.modelo,
        color: x.color,
        ubicacion: [x.latitud, x.longitud]
      }));
      console.log(newRows);
      resolve(newRows);
    });
  });
};
Bicicleta.add = function (aBici) {
  db.run(`INSERT INTO Bicicletas VALUES ("${aBici.id}", "${aBici.modelo}", "${aBici.color}", "${aBici.ubicacion[0]}", "${aBici.ubicacion[1]}")`)
};
Bicicleta.findById = function (aBiciId) {
  return new Promise((resolve, reject) => {
    db.get(`SELECT * FROM Bicicletas WHERE id = "${aBiciId}"`, function(err, data) {
      if (!data) {
        reject(new Error('not found'))
      }
      else {
        var newData = {
          id: data.id,
          modelo: data.modelo,
          color: data.color,
          ubicacion: [data.latitud, data.longitud]
        };
        resolve(newData)
      }
    })
  });
};

Bicicleta.removeById = function (aBiciId) {
  db.run(`DELETE FROM Bicicletas WHERE id = "${aBiciId}"`)
};

module.exports = Bicicleta;
