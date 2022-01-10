const express = require('express');
const {getGame,createGame,removeGame} = require('../db/games');
const {reportEndOfMatch} = require('../db/users');
const router = express.Router();

function getPayload(game){

    const payload = {
        kediIndex:game.kediIndex,
        imgs: game.imgs,
        victory: game.victory,
        defeat: game.defeat,
        defimg:game.defimg,
        hak: game.hak
    };

    return payload;
}

router.post('/games', (req, res) => {

    if (!req.user) {
        res.status(401).send();
        return;
    }

    const game= createGame(req.user.id);
    const payload = getPayload(game);

    res.status(201).json(payload);
});


router.get('/games/ongoing', (req, res) => {

    if (!req.user) {
        res.status(401).send();
        return;
    }

    const game = getGame(req.user.id);
    if(!game){
        res.status(404).send();
        return;
    }

    const payload = getPayload(game);

    res.status(200).json(payload);
});

router.post('/games/ongoing', (req, res) => {

    if (!req.user) {
        res.status(401).send();
        return;
    }

    const game = getGame(req.user.id);

    if(! game || game.victory || game.defeat){
        res.status(400).send();
        return;
    }

    const dto = req.body;
    game.defimg[dto.index]=dto.answerIndex;

    if(dto.index !== game.kediIndex){
        game.hak--;
        if(game.hak===0){
            game.defeat = true;
            reportEndOfMatch(req.user.id, false);
            removeGame(req.user.id);
            createGame(req.user.id);
        }
    }
    else {
        {
            game.victory = true;
            reportEndOfMatch(req.user.id, true);
            removeGame(req.user.id);
            createGame(req.user.id);
        }
    }

    const payload = getPayload(game);

    res.status(201).json(payload);
});

module.exports = router;