const IncidentTicket = require("./IncidentTicket");
const ServiceRequestTicket = require("./ServiceRequestTicket");

class TicketFactory {
    static create(type, data) {
        switch(type) {
            case "INCIDENT":
                return new IncidentTicket(data);
            case "SERVICE_REQUEST":
                return new ServiceRequestTicket(data);
            default:
                throw new Error(`Unknown ticket type: ${type}`);
        }
    }
}

module.exports = TicketFactory;