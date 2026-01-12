const { z } = require("zod");

const createAssetSchema = z.object({
    body: z.object({
        name: z.string().min(3),
        description: z.string().min(10).optional(),
        category: z.enum(["COMPUTER", "PRINTER", "MONITOR", "OTHER"]),
        location: z.string().min(3),
        status: z.enum(["ACTIVE", "INACTIVE"]),
    }),
});

module.exports = { createAssetSchema };
