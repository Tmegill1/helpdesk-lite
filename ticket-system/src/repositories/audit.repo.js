const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function createAudit(data) {
    return prisma.audit.create({ data });
}

module.exports = { createAudit };