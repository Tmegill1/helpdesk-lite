const { z } = require("zod");

const createTicketSchema = z.object({
    body: z.object({
        type: z.enum(["INCIDENT", "SERVICE_REQUEST"]),
        title: z.string().min(3),
        description: z.string().min(10).optional(),
        priority: z.enum(["LOW", "MEDIUM", "HIGH"]).default("MEDIUM"),
        assetId: z.number().int().optional(),
    }),
});

module.exports = { createTicketSchema };