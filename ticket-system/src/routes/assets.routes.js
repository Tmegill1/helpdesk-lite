const router = require("express").Router();
const { createAssetSchema } = require("../validators/asset.validators");
const validate = require("../middleware/validate");
const auth = require("../middleware/auth");
const controller = require("../controllers/assets.controller");

router.post("/", auth, validate(createAssetSchema), controller.createAsset);

module.exports = router;
