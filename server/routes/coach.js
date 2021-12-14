const express = require('express');
const router = express.Router();
const coachController = require('../controllers/coachController');

router.get('/statistic/route/all', coachController.getRouteStatistic);
router.get('/statistic/balance/detail', coachController.getBalanceDetail);
router.get('/statistic/balance', coachController.getBalanceStatistic);
router.post('/create/route', coachController.createNewRoute);
router.post('/create/coach', coachController.createNewCoach);
router.get('/search', coachController.searchCoaches);
router.get('/detail', coachController.getCoachDetailById);
router.patch('/edit', coachController.editCoachDetail);
router.delete('/delete', coachController.deleteCoachById);
router.get('/popular', coachController.getPopularCoaches);
router.get('/mycoach', coachController.getOwnerCoaches);
router.get('/', coachController.getAllCoaches);

module.exports = router;