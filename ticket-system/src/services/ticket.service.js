const ticketRepo = require("../repositories/ticket.repo");
const ticketNumber = require("../utils/ticketNumber");
const auditService = require("./audit.service");

async function createTicket({userID, type, title, description, priority, assetId}) {
    const number = ticketNumber(type === "INCIDENT" ? "INC" : "SR");

    const ticket = await ticketRepo.createTicket({
        number,
        type,
        status: "OPEN",
        title,
        description: description ?? null,
        priority,
        assetId: assetId ?? null,
        userId,
    });
    await auditService.createAudit({
        userId: userID,
        action: "CREATE",
        entityType: "TICKET",
        entityId: ticket.id,
        details: `Ticket ${number} created`
    });

    return ticket;
}

module.exports = { createTicket };