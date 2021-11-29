const express = require('express');
const router = express.Router();
const ticketController = require('../controllers/ticketController');

router.get('/detail', ticketController.getTicketById);
router.get('/myticket', ticketController.getUserTicket);
router.post('/add', ticketController.addNewTicket);
router.get('/', ticketController.getAllTicket);

module.exports = router;