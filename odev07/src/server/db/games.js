const {reportEndOfMatch} = require("./users");

const games = new Map();

let counter = 0;


function createGame(userId) {

    var defimg = ['img/default.png','img/default.png','img/default.png'];
    var imgs=['img/kopek.webp','img/kopek.webp','img/kopek.webp']
    kediIndex = Math.floor(Math.random()*3);
    imgs[kediIndex]='img/kedi.webp';

    const game = {
        kediIndex,
        hak: 2,
        defimg,
        imgs,
        victory: false,
        defeat: false
    };

    games.set(userId, game);

    return game;
}

function  shuffle() {
    const imgs=['img/kedi.webp','img/kopek.webp','img/kopek.webp'];
    var j, x, i;
    for (i = imgs.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = imgs[i];
        imgs[i] = imgs[j];
        imgs[j] = x;
    }
    return imgs
}

function getGame(userId) {
    return games.get(userId);
}

function removeGame(userId){
    games.delete(userId);
}

module.exports = {getGame,createGame,removeGame};