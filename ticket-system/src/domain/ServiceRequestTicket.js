const Ticket = require("./Ticket");

class ServiceRequestTicket extends Ticket {
    constructor(data) {
        super(data);
        this.type = "SERVICE_REQUEST";
    }

    // Service request specific logic
}

module.exports = ServiceRequestTicket;