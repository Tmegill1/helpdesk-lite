const ticketRepo = require("../repositories/ticket.repo");
const ticketNumber = require("../utils/ticketNumber");

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

    return ticket;
}

module.exports = { createTicket };