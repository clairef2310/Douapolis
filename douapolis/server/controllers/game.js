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
                        owners: propertyOwner,
                        buildings: buildings,
                        mortgagedProperties: []
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

exports.build = async function build(req, res, next) {
    let db_connect = dbo.getDb();

    let gameQuery = {};
    let playerQuery = {};
    let propertyQuery = {};

    try {
        gameQuery = { code: req.body.gameCode };
        propertyQuery = { adress: req.body.propertyAdress };
        playerQuery = { pseudo: req.body.player };
    } catch (e) {
        res.status(400).json(
            { error: "Unable to build on this property: not enough information passed"}
        );
        return;
    }

    let player = await db_connect.collection("users").findOne(playerQuery);
    let property = await db_connect.collection("properties").findOne(propertyQuery);
    let game = await db_connect.collection("game").findOne(gameQuery);

    let groupProperties = await db_connect
        .collection("properties")
        .find({ group: property.group })
        .toArray();

    if (game.owners[property.adress] !== player.pseudo) {
        res.status(400).json({
            error: "Unable to built on this property: player is not the owner"
        });
        return;
    }

    if (game.mortgagedProperties.includes(property.adress)) {
        res.status(400).json({
            error: "Unable to build on this property: property is mortgaged"
        });
        return;
    }

    try {
        groupProperties.forEach((prop) => {
            if (prop.adress !== property.adress
                && game.buildings[property.adress] - game.buildings[prop.adress] == 1
            ) {
                throw 1;
            }
        });
    } catch(e) {
        res.status(400).json(
            { error: "Unable to build on this property: uneven building" }
        );
        return;
    }

    player.money -= property.buildingCost;
    game.buildings[property.adress] += 1;

    try {
        db_connect.collection("users").updateOne(playerQuery, { $set: player });
        db_connect.collection("game").updateOne(gameQuery, { $set: game });
    } catch (e) {
        res.status(500).json({ error: "Unable to write changes to DB"});
        return;
    }

    res.status(201).json({ message: "Succesfully built house"});
}

exports.mortgage = async function mortgage(req, res, next) {
    let db_connect = dbo.getDb();

    let gameQuery = {};
    let propertyQuery = {};
    let playerQuery = {};

    try {
        gameQuery = { code: req.body.gameCode };
        propertyQuery = { adress: req.body.propertyAdress };
    } catch (e) {
        res.status(400).json(
            { error: "Unable to mortgage property: not enough information passed"}
        );
        return;
    }

    let property = await db_connect.collection("properties").findOne(propertyQuery);
    let game = await db_connect.collection("game").findOne(gameQuery);

    if (game.owners[property.adress] === null) {
        res.status(400).json({
            error: "Unable to mortgage property: property isn't owned by a player"
        });
        return;
    }

    playerQuery = { pseudo: game.owners[property.adress]};
    let player = await db_connect.collection("users").findOne(playerQuery);

    if (game.buildings[property.adress] > 0) {
        res.status(400).json({
            error: "Unable to mortgage property: property has bulding(s)"
        });
        return;
    }

    game.mortgagedProperties.push(property.adress);
    player.money += (property.price/2);

    try {
        db_connect.collection("users").updateOne(playerQuery, { $set: player });
        db_connect.collection("game").updateOne(gameQuery, { $set: game });
    } catch (e) {
        res.status(500).json({ error: "Unable to write changes to DB"});
        return;
    }

    res.status(201).json({ message: "Succesfully mortgaged property"});
}
