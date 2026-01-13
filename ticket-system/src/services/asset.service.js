const assetRepo = require("../repositories/asset.repo");
//const assetNumber = require("../utils/assetNumber");

async function createAsset({name, description, category, location, status}) {

    const asset = await assetRepo.createAsset({
        name,
        description: description ?? null,
        category,
        location,
        status: status ?? "ACTIVE",
    });

    return asset;
}

module.exports = { createAsset };

