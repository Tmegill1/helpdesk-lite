const auditRepo = require("../repositories/audit.repo");

async function createAudit({userId, action, entityType, entityId, details}) {
    const audit = await auditRepo.createAudit({
        userId,
        action,
        entityType,
        entityId,
        details: details ?? null,
    });

    return audit;
}

module.exports = { createAudit };