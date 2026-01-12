function generateTicketNumber(prefix = "TCK") {
    const date = new Date().toISOString().slice(0, 10).replaceAll("-", "");
    const random = Math.floor(1000 + Math.random() * 9000);
    return `${prefix}-${date}-${random}`;
}
module.exports = { generateTicketNumber };