const express = require("express");
const router = express.Router();
const bicicletaController = require("../../controllers/api/bicicletaControllerApi");

router.get("/", bicicletaController.list);
router.get("/:id", bicicletaController.show);
router.post("/create", bicicletaController.add);
router.put("/update", bicicletaController.update);
router.delete("/:id/delete", bicicletaController.delete);

module.exports = router;
