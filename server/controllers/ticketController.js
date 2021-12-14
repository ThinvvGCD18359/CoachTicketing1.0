const prisma = require('../prisma/prisma');

class TicketController {
    getAllTicket = async (req, res, next) => {
        try {
            const allTicket = await prisma.ticket.findMany({
                where: {
                    coachId: parseInt(req.query.coachId),
                },
                include: {
                    User: true,
                    Coach: {
                        include: {
                            Route: true,
                        },
                    },
                }
            });
            const reserveSeats = allTicket.reduce((arr, item) => {
                return [...arr, ...item.seat]
            }, []);
            res.status(200).json(reserveSeats);
        } catch (error) {
            return next(error);
        };
    };
    addNewTicket = async (req, res, next) => {
        try {
            const addTicket = await prisma.ticket.create({
                data: {
                    seat: req.body.seat,
                    price: parseInt(req.body.price),
                    userId: req.body.userId,
                    coachId: parseInt(req.body.coachId),
                    createdAt: new Date(req.body.createdAt),
                },
            });
            res.status(200).json(addTicket);
        } catch (error) {
            return next(error);
        };
    };
    getUserTicket = async (req, res, next) => {
        try {
            const userTicket = await prisma.ticket.findMany({
                where: {
                    userId: req.query.currentUserId,
                },
                include: {
                    User: true,
                    Coach: {
                        include: {
                            Route: true,
                        },
                    },
                },
            });
            res.status(200).json(userTicket);
        } catch (error) {
            return next(error);
        }
    };
    getTicketById = async (req, res, next) => {
        try {
            const getDetailTicket = await prisma.ticket.findUnique({
                where: {
                    id: parseInt(req.query.ticketId),
                },
                include: {
                    User: true,
                    Coach: {
                        include: {
                            Route: true,
                        },
                    },
                },
            });
            res.status(200).json(getDetailTicket);
        } catch (error) {
            return next(error);
        }
    };
}

module.exports = new TicketController();