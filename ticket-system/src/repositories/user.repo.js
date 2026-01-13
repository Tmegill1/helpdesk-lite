const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

function findByEmail(email) {
  return prisma.user.findUnique({ where: { email } });
}

module.exports = { findByEmail };