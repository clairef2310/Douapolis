const express = require("express");
const playingRoutes = express.Router();

const gameCtrl = require("../controllers/game");

// Achat propriété
playingRoutes.post('/play/buyProperty', gameCtrl.buyProperty);

// Construction de maison
playingRoutes.post('/play/build', gameCtrl.build);

// Hypothèque de propriété
playingRoutes.post('/play/mortgage', gameCtrl.mortgage);

// /!\ Non testé !
//playingRoutes.post('/play/playerAt', gameCtrl.playerAt);

module.exports = playingRoutes;
