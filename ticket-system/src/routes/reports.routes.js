const router = require("express").Router();
const auth = require("../middleware/auth");
const requireRole = require("../middleware/requireRole");
const controller = require("../controllers/reports.controller");


router.get("/", auth, requireRole(["ADMIN", "MANAGER"]), controller.getReports);

module.exports = router;