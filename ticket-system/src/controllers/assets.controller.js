const assetService = require("../services/asset.service");

async function createAsset(req, res, next) {
    try {
        const asset = await assetService.createAsset({
            userId: req.user.id,
            ...req.body,
        });
        res.status(201).json(asset);
    } catch (err) {
        next(err);
    }
}

module.exports = { createAsset };
