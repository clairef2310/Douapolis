const express = require("express");
const playingRoutes = express.Router();

const gameCtrl = require("../controllers/game");


playingRoutes.post('/play/buyProperty', gameCtrl.buyProperty);
playingRoutes.post('/play/build', gameCtrl.build);
playingRoutes.post('/play/mortgage', gameCtrl.mortgage);

module.exports = playingRoutes;
