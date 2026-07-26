const express = require("express");
const router = express.Router();
const { recommendMesses } = require("../controllers/mess.controller");

const {
  createMess,
  getAllMesses,
  getMessById,
  updateMess,
  deleteMess,
} = require("../controllers/mess.controller");

router.get("/", getAllMesses);
router.post("/", createMess);

router.post("/recommend", recommendMesses);

router.get("/:id", getMessById);
router.put("/:id", updateMess);
router.delete("/:id", deleteMess);

module.exports = router;