var map = L.map("main_map").setView([6.1630788, -75.631681], 17);
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution:
    '&copy; <a href="https://wwww.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);

$.ajax({
  datatype: "json",
  url: "/api/bicicletas",
  success: function (results) {
    console.log(results);
    results.bicicletas.forEach(function (bici) {
      L.marker(bici.ubicacion, {
        title: "Bicicleta Nro: " + bici.id + "Modelo: " + bici.modelo,
      }).addTo(map);
    });
  },
});
