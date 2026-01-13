const ReportsController = require("./reports.service");

async function createReport(req, res, next){
    try{
        const reports = await reportService.createReport({
            ...req.body,
        })
        res.status(201).json(asset);
    }
    catch(err){
        next(err);
    }
}

module.exports = { getReports };
            