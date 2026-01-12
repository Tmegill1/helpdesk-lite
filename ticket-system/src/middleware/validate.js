module.exports = (schema) => async (req, res, next) => {
    try {
        const parsed = schema.parse({ body: req.body, params: req.params, query: req.query});
        req.body = parsed.body;
        next();
    } catch (err) {
        err.status = 400;
        err.publicMessage = err.errors?.map(e => e.message).join(", ") || "Invalid request";
        next(err);
    }
};