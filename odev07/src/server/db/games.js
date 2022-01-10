const {reportEndOfMatch} = require("./users");

const games = new Map();

let counter = 0;


function createGame(userId) {

    img =['img/kopek.webp','img/kopek.webp','img/kopek.webp'];
    kediIndex = Math.floor(Math.random()*3);
    img[kediIndex]='img/kedi.webp';

    const game = {
        kediIndex,
        victory: false,
        defeat: false,
        img:img,
        kart: ["img/default.png","img/default.png","img/default.png"],
        kartSayac: 0,
        hak:2,
        oyunSonlandi: false
    };

    games.set(userId, game);

    return game;
}


function getGame(userId) {
    return games.get(userId);
}

function removeGame(userId){
    games.delete(userId);
}

module.exports = {getGame,createGame,removeGame};