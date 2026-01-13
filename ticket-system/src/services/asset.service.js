const assetRepo = require("../repositories/asset.repo");
const auditService = require("./audit.service");

async function createAsset({userId, name, description, category, location, status}) {

    const asset = await assetRepo.createAsset({
        name,
        description: description ?? null,
        category,
        location,
        status: status ?? "ACTIVE",
    });

    await auditService.createAudit({
        userId, 
        action: "CREATE",
        entityType: "ASSET",
        entityId: asset.id,
        details: `Asset ${name} created`
    })

    return asset;
}

module.exports = { createAsset };

