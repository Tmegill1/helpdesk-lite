const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();


async function createAsset(data) {
    return prisma.asset.create({ data });
}

async function findByName(name) {
    return prisma.asset.findUnique({ where: { name } });
}

module.exports = { createAsset, findByName };

