const Ticket = require("./Ticket");

class IncidentTicket extends Ticket {
    constructor(data) {
        super(data);
        this.type = "INCIDENT";
    }

    calculatePriority() {
        // Incident-specific priority logic
    }

    requiresUrgentResponse() {
        // Business rules for incidents
        return this.priority === "HIGH";
    }
}

module.exports = IncidentTicket;