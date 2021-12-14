const prisma = require('../prisma/prisma');
const moment = require('moment');

class CoachController {
   getAllCoaches = async (req, res, next) => {
      try {
         const allCoaches = await prisma.coach.findMany({
            include: {
               Route: true,
            }
         });
         res.status(200).json(allCoaches);
      } catch (error) {
         return next(error);
      }
   };

   getOwnerCoaches = async (req, res, next) => {
      try {
         const getCoaches = await prisma.coach.findMany({
            include: {
               Route: true,
            },

            where: {
               userId: req.query.currentUserId,
            }
         });
         res.status(200).json(getCoaches);
      } catch (error) {
         return next(error);
      }
   };

   getPopularCoaches = async (req, res, next) => {
      try {
         const response = await prisma.coach.findMany({
            include: {
               Route: true,
            },
            take: 3,
            orderBy: {
               name: 'asc',
            },
         });

         return res.status(200).json(response);
      } catch (error) {
         return next(error);
      }
   };

   getCoachDetailById = async (req, res, next) => {
      try {
         const getDetailCoach = await prisma.coach.findUnique({
            where: {
               id: parseInt(req.query.coachId),
            },
            include: {
               Route: true,
            },
         });
         res.status(200).json(getDetailCoach);
      } catch (error) {
         return next(error);
      }
   };

   createNewCoach = async (req, res, next) => {
      try {
         const createCoach = await prisma.coach.create({
            data: {
               name: req.body.name,
               plates: req.body.plates,
               phonenumber: req.body.phonenumber,
               userId: req.body.currentUserId,
            },
         });
         res.status(200).json(createCoach);
      } catch (error) {
         return next(error);
      }
   };

   createNewRoute = async (req, res, next) => {
      try {
         const createRoute = await prisma.route.create({
            data: {
               starting: req.body.starting,
               destination: req.body.destination,
               departure: new Date(req.body.departure),
               price: parseInt(req.body.price),
               coachId: parseInt(req.body.coachId),
            },
         });
         res.status(200).json(createRoute);
      } catch (error) {
         return next(error);
      }
   };

   deleteCoachById = async (req, res, next) => {
      try {
         const deleteCoach = await prisma.coach.delete({
            where: {
               id: parseInt(req.body.id),
            },
         });
         return res.status(200).json(deleteCoach);
      } catch (error) {
         return next(error);
      }
   };

   editCoachDetail = async (req, res, next) => {
      try {
         const editCoach = await prisma.coach.update({
            where: {
               id: parseInt(req.body.id)
            },
            data: {
               name: req.body.name,
               phonenumber: req.body.phonenumber,
               plates: req.body.plates,
            },
         });
         const editRoute = await prisma.route.update({
            where: {
               coachId: parseInt(editCoach.id)
            },
            data: {
               starting: req.body.starting,
               destination: req.body.destination,
               departure: new Date(req.body.departure),
               price: parseInt(req.body.price),
            },
         })
         return res.status(200).json({ editCoach, editRoute })
      } catch (error) {
         return next(error);
      }
   };

   searchCoaches = async (req, res, next) => {
      try {
         if (req.query.searchFilter === "name") {
            const searchByName = await prisma.coach.findMany({
               where: {
                  name: {
                     contains: req.query.searchInput,
                     mode: "insensitive",
                  },
               },
               include: {
                  Route: true,
               }
            })
            return res.status(200).json(searchByName);
         };
         if (req.query.searchFilter === "price") {
            const searchByPrice = await prisma.coach.findMany({
               where: {
                  Route: {
                     price: parseInt(req.query.searchInput) || undefined,
                  },
               },
               include: {
                  Route: true,
               }
            })
            return res.status(200).json(searchByPrice);
         };
         if (req.query.searchFilter === "starting") {
            const searchByStarting = await prisma.coach.findMany({
               where: {
                  Route: {
                     starting: {
                        contains: req.query.searchInput,
                        mode: "insensitive",
                     },
                  },
               },
               include: {
                  Route: true,
               },
            });
            return res.status(200).json(searchByStarting);
         }

      } catch (error) {
         return next(error);
      }
   };
   getRouteStatistic = async (req, res, next) => {
      try {
         const getAllRoute = await prisma.route.findMany();
         const calculateRouteByDate = getAllRoute.reduce((array, item) => {
            const routeDepartureDate = moment(item.departure).format("YYYY-MM-DD");
            if (array.some(a => a.departureDate === routeDepartureDate)) {
               const findIndex = array.findIndex(i => i.departureDate === routeDepartureDate);
               array[findIndex].countRoute += 1;
               array[findIndex].departureDate = routeDepartureDate;
            } else {
               array.push({
                  countRoute: 1,
                  departureDate: routeDepartureDate,
               });
            }
            return array;
         }, []);
         return res.json(calculateRouteByDate);
      } catch (error) {
         return next(error)
      };
   };
   getBalanceStatistic = async (req, res, next) => {
      try {
         const getAllTicket = await prisma.coach.findMany({
            where: {
               userId: req.query.currentUserId,
            },
            include: {
               Route: true,
               Ticket: true,
            },
         });
         const getBalanceByDate = getAllTicket.reduce((total, item) => {
            const totalPriceInTicket = item.Ticket.reduce((ticketTotal, ticket) => {
               return ticketTotal += ticket.price
            }, 0)
            return total += totalPriceInTicket;
         }, 0);
         
         res.status(200).json(getBalanceByDate);
      } catch (error) {
         return next(error)
      };
   };
   getBalanceDetail = async (req, res, next) => {
      try {
         const getAllTicket = await prisma.coach.findMany({
          where: {
              userId: req.query.currentUserId,
           },
           include: {
              Route: true,
              Ticket: true,
           },
         });
         const getDetailBalance = getAllTicket.reduce((array, item) => {
            const detailBalance = moment(item.Ticket[0].createdAt).format("YYYY-MM-DD");
            const totalPriceInTicket = item.Ticket.reduce((ticketTotal, ticket) => {
               return ticketTotal += ticket.price
            }, 0)
            if (array.some(a => a.ticketDate === detailBalance)) {
               const findIndex = array.findIndex(i => i.ticketDate === detailBalance);
               array[findIndex].total += totalPriceInTicket;
               array[findIndex].ticketDate = detailBalance;
            } else {
               array.push({
                  total: totalPriceInTicket,
                  ticketDate: detailBalance,
               });
            }
            return array;
         }, []);
         return res.json(getDetailBalance);
      } catch (error) {
         return next(error)
      };
   };
}

module.exports = new CoachController();