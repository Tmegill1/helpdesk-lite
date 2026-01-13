const ticketRepo = require("../repositories/ticket.repo");
const assetRepo = require("../repositories/asset.repo");
const auditService = require("./audit.service");
const {PrismaClient} = require("@prisma/client");
const prisma = new PrismaClient();

async function getReports(query) {
    const { startDate, endDate, status, assetId, userId } = query;

    const reports = {
        tickets: await ticketRepo.getTicketsReport({status, startDate, endDate}),
        assets: await getAssetsReport(),
        audit: await getAuditReports({ entityType, startDate, endDate }),
        summary: await getSummaryReport({ startDate, endDate })
    }

    return reports;
}

async function getTicketsReport({status, startDate, endDate}) {
    const where = {};
    if (status) {
        where.status = status;
    }
    if (startDate || endDate) {
        where.createdAt = {};
        if (startDate) where.createdAt.gte = new Date(startDate);
        if (endDate) where.createdAt.lte = new Date(endDate);
    }

    const tickets = await prisma.ticket.findMany({
        where,
        include: {
            user: {
                select: {
                    id: true,
                    email: true
                }
            }
        }
    });
    const stats = {
        total: tickets.length,
        byStatus: {},
        byType: {},
        byPriority: {}
    };
    
    tickets.forEach(ticket => {
        // Count by status
        stats.byStatus[ticket.status] = (stats.byStatus[ticket.status] || 0) + 1;
        
        // Count by type
        stats.byType[ticket.type] = (stats.byType[ticket.type] || 0) + 1;
    });
    
    return {
        data: tickets,
        statistics: stats
    };
}
async function getAssetReports() {
    const assets = await prisma.asset.findMany();
    
    const stats = {
        total: assets.length,
        byCategory: {},
        byStatus: {},
        byLocation: {}
    };
    
    assets.forEach(asset => {
        stats.byCategory[asset.category] = (stats.byCategory[asset.category] || 0) + 1;
        stats.byStatus[asset.status] = (stats.byStatus[asset.status] || 0) + 1;
        stats.byLocation[asset.location] = (stats.byLocation[asset.location] || 0) + 1;
    });
    
    return {
        data: assets,
        statistics: stats
    };
}

async function getAuditReports({ entityType, startDate, endDate }) {
    const where = {};
    
    if (entityType) {
        where.entityType = entityType;
    }
    
    if (startDate || endDate) {
        where.createdAt = {};
        if (startDate) where.createdAt.gte = new Date(startDate);
        if (endDate) where.createdAt.lte = new Date(endDate);
    }
    
    const audits = await prisma.audit.findMany({
        where,
        include: {
            user: {
                select: {
                    id: true,
                    email: true
                }
            }
        },
        orderBy: {
            createdAt: 'desc'
        },
        take: 100 // Limit to most recent 100
    });
    
    const stats = {
        total: audits.length,
        byAction: {},
        byEntityType: {}
    };
    
    audits.forEach(audit => {
        stats.byAction[audit.action] = (stats.byAction[audit.action] || 0) + 1;
        stats.byEntityType[audit.entityType] = (stats.byEntityType[audit.entityType] || 0) + 1;
    });
    
    return {
        data: audits,
        statistics: stats
    };
}

async function getSummaryReport({ startDate, endDate }) {
    const where = {};
    
    if (startDate || endDate) {
        where.createdAt = {};
        if (startDate) where.createdAt.gte = new Date(startDate);
        if (endDate) where.createdAt.lte = new Date(endDate);
    }
    
    const [ticketCount, assetCount, auditCount] = await Promise.all([
        prisma.ticket.count({ where }),
        prisma.asset.count(),
        prisma.audit.count({ where })
    ]);
    
    return {
        totalTickets: ticketCount,
        totalAssets: assetCount,
        totalAuditEntries: auditCount,
        period: {
            startDate: startDate || null,
            endDate: endDate || null
        }
    };
}

module.exports = { getReports };