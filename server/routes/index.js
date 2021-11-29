const userRouter = require('./user');
const coachRouter = require('./coach');
const ticketRouter = require('./ticket');
const accountRouter = require('./account');

function route(app) {
   app.use('/coach', coachRouter);
   app.use('/user', userRouter);
   app.use('/ticket', ticketRouter);
   app.use('/admin', accountRouter);
};

module.exports = route;