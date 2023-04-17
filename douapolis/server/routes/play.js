const express = require("express");
const playingRoutes = express.Router();

const gameCtrl = require("../controllers/game");


playingRoutes.post('/play/buyProperty', gameCtrl.buyProperty);
playingRoutes.post('/play/build', gameCtrl.build);

module.exports = playingRoutes;
