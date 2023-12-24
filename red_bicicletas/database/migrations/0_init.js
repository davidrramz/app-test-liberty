var sqlite3 = require('sqlite3');

var db = new sqlite3.Database('bicicletas.db');

db.serialize(function() {
    db.run("CREATE TABLE IF NOT EXISTS Bicicletas (id INTEGER PRIMARY KEY, modelo TEXT, color TEXT, latitud REAL, longitud REAL)");
});

db.close();