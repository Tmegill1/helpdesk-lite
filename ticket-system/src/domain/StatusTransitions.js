const VALID_TRANSITIONS = {
    OPEN: ["IN_PROGRESS", "CLOSED"],
    IN_PROGRESS: ["RESOLVED", "CLOSED"],
    RESOLVED: ["CLOSED"],
    CLOSED: [] // Terminal state
};

function canTransition(currentStatus, newStatus) {
    return VALID_TRANSITIONS[currentStatus]?.includes(newStatus) || false;
}

module.exports = { canTransition, VALID_TRANSITIONS };