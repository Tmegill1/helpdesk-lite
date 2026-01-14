const SLA_RULES = {
    INCIDENT: {
        HIGH: { responseTime: 1, resolutionTime: 4 }, // hours
        MEDIUM: { responseTime: 4, resolutionTime: 24 },
        LOW: { responseTime: 24, resolutionTime: 72 }
    },
    SERVICE_REQUEST: {
        HIGH: { responseTime: 4, resolutionTime: 24 },
        MEDIUM: { responseTime: 24, resolutionTime: 72 },
        LOW: { responseTime: 72, resolutionTime: 168 }
    }
};

function getSlaForTicket(type, priority) {
    return SLA_RULES[type]?.[priority] || null;
}

module.exports = { getSlaForTicket, SLA_RULES };