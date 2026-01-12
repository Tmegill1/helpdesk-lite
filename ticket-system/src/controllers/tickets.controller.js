const ticketService = require("../services/ticket.service");

async function createTicket(req, res, next) {
    try {
        const userId = req.user.id;

        const ticket = await ticketService.createTicket({
            userId,
            ...req.body,
        });

        res.status(201).json(ticket);
    } catch (err) {
        next(err);
    }
}

module.exports = { createTicket };