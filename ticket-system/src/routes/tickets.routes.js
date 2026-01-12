const router = require("express").Router();
const { createTicketSchema } = require("../validators/ticket.validators");
const validate = require("../middleware/validate");
const auth = require("../middleware/auth");
const controller = require("../controllers/tickets.controller");

router.post("/", auth, validate(createTicketSchema), controller.createTicket);

module.exports = router;