const { canTransition } = require("./StatusTransitions");
const { getSlaForTicket } = require("./SlaPolicy");



class Ticket {
    constructor({ number, type, status, title, userId, createdAt }) {
        this.number = number;
        this.type = type;
        this.status = status;
        this.title = title;
        this.userId = userId;
        this.createdAt = createdAt;
    }

    canTransitionTo(newStatus) {
        if (!canTransition(this.status, newStatus)) {
            throw new Error(
                `Invalid status transition from ${this.status} to ${newStatus}`
            );
        }
        return true;
    }

    isOverdue() {
        if (this.status === "CLOSED" || this.status === "RESOLVED") {
            return false;
        }
        const sla = getSlaForTicket(this.type, this.priority);
        if (!sla) {
            return false;
        }
        const now = new Date();
        const createdAt = new Date(this.createdAt);
        const hoursOpen = (now - createdAt) / (1000 * 60 * 60);
        
        return hoursOpen > sla.responseTime;
    }

    isResponseOverdue() {
        if (this.status !== "OPEN") {
            return false;
        }
        
        const sla = getSlaForTicket(this.type, this.priority);
        if (!sla) return false;
        
        const now = new Date();
        const created = new Date(this.createdAt);
        const hoursOpen = (now - created) / (1000 * 60 * 60);
        
        return hoursOpen > sla.responseTime;
    }
}

module.exports = Ticket;