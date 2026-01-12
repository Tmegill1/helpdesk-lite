const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function createTicket(data) {
    return prisma.ticket.create({ data });
}

async function findByNumber(number) {
    return prisma.ticket.findUnique({ where: { number } });
}

module.exports = { createTicket, findByNumber };