const reportService = require("../services/report.service");

async function getReports(req, res, next) {
    try {
        const reports = await reportService.getReports(req.query);
        res.status(200).json(reports);
    } catch (err) {
        next(err);
    }
}

module.exports = { getReports };