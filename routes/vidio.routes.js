const router = require("express").Router();
const {
  createVidio,
  deleteVidio,
  detailVidio,
  editVidio,
  showAllVidio,
  searchFilterVidio,
} = require("../controllers/vidio.controllers");
const Auth = require("../middlewares/authentication");
const checkRole = require("../middlewares/checkRole");

router.post("/", Auth, checkRole(["admin"]), createVidio);
router.get("/", Auth, checkRole(["admin"]), showAllVidio);
router.get("/search", Auth, checkRole(["admin"]), searchFilterVidio); // Search and Filter Vidio
router.get("/:idVidio", Auth, checkRole(["admin"]), detailVidio);
router.put("/:idVidio", Auth, checkRole(["admin"]), editVidio);
router.delete("/:idVidio", Auth, checkRole(["admin"]), deleteVidio);




module.exports = router;
