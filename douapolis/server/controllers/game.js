const dbo = require('../db/conn');


// Initialisation de la partie
exports.startGame = (req, res, next) => {
    let db_connect = dbo.getDb();
    let gameQuery = { code: req.params.code };
    let gameObject = {};
    let players = [];

    // Initialisation du dictionnaire de propriétaire des différentes propriétés
    db_connect
        .collection("properties")
        .find()
        .toArray()
        .then((properties) => {
            let propertyOwner = {};
            properties.forEach(prop => {
                propertyOwner[prop.adress] = null;
            });

            let buildings = {};
            properties.forEach(prop => {
                buildings[prop.adress] = 0;
            });


            db_connect
                .collection("game")
                .updateOne(
                    gameQuery,
                    { $set: {
                        state: "started",
                        owners: propertyOwner
                    }}
                );

            db_connect
                .collection("game")
                .updateOne(
                    gameQuery,
                    { $set : {
                        buildings: buildings
                    }}
                );
        })
        .catch((err) => res.status(400).json(err));

    db_connect
        .collection("game")
        .findOne(gameQuery)
        .then((game) => {
            let players = [
                game.host,
                game.p2,
                game.p3,
                game.p4
            ];

            db_connect
                .collection("users")
                .updateMany(
                    { pseudo: { $in: players}},
                    { $set: {
                        money: 1500,
                        properties: []
                    }}
                );
        })
        .then(() => res.status(201).json({message: "Game started"}))
        .catch((err) => res.status(400).json(err));
}

// renvoyer le proprio et l'argent
exports.playerAt = (req, res, next) => {
    let playerName = req.body.player;
    let propName = req.body.property;
}

//retourne l'agrent restant
exports.buyProperty = (req, res, next) => {
    let db_connect = dbo.getDb();
    let gameQuery = { code: req.body.gameCode };
    let propertyQuery = { adress: req.body.propertyAdress };
    let playerQuery = { pseudo: req.body.player };

    db_connect
    .collection("users")
    .findOne(playerQuery)
    .then((player) => {

        db_connect
        .collection("properties")
        .findOne(propertyQuery)
        .then((property) => {

            db_connect
            .collection("game")
            .findOne(gameQuery)
            .then((game) => {

                if (game.owners[property.adress] === player.pseudo ) {
                    throw "The player is already the owner of this property";
                }

                player.money -= property.price;
                player.properties.push(property.adress);
                game.owners[property.adress] = player.pseudo;

                db_connect
                .collection("users")
                .updateOne(playerQuery, { $set: player })
                .catch((err) => console.error(err));

                db_connect
                .collection("game")
                .updateOne(gameQuery, { $set: game })
                .catch((err) => console.error(err));

                res.status(200).json(player);
            })
            .catch((err) => res.status(400).json({ message: err }));
        });
    })
    .catch((err) => res.status(500).json(err));
}

//TODO check proprietaire groupe, construction uniforme
exports.build = (req, res, next) => {
    console.log(req.body);
    let db_connect = dbo.getDb();

    let gameQuery = { code: req.body.gameCode };
    let propertyQuery = { adress: req.body.propertyAdress };
    let playerQuery = { pseudo: req.body.player };

    db_connect
    .collection("users")
    .findOne(playerQuery)
    .then((player) => {
        db_connect
        .collection("properties")
        .findOne(propertyQuery)
        .then((property) => {
            db_connect
            .collection("game")
            .findOne(gameQuery)
            .then((game) => {

                if (game.owners[property.adress] !== player.pseudo) {
                    throw "The player is not the owner of this property";
                }

                player.money -= property.buildingCost;
                game.buildings[property.adress] += 1;

                db_connect
                .collection("game")
                .updateOne(gameQuery, { $set: game })
                .then(() => res.status(200).json({ message: "House built" }));
            })
            .catch((err) => res.status(400).json({message: err}));
        })
        .catch(() => res.status(500).json({message: err}));
    })
    .catch(() => res.status(500).json({message: err}));
}
