const express = require('express');
const { getReservations } = require('../controllers/reservationsController');

const router = express.Router();

router.get('/reservations', getReservations);

module.exports = router;