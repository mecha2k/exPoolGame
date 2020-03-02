let sounds = {};
let sprites = {};
let assetsStillLoading = 0;

sounds.fadeOut = function (sound) {
    let fadeAudio = setInterval(function () {
        if(GAME_STOPPED) return;
        if ((sound.volume >= 0.05))
            sound.volume -= 0.05;
        else {
            sound.pause();
            clearInterval(fadeAudio);
        }
    }, 400);
}

function assetsLoadingLoop(callback) {
    if(assetsStillLoading) {
        requestAnimationFrame(assetsLoadingLoop.bind(this, callback));
    } else {
        callback();
    }
}

function loadAssets(callback) {
    function loadSprite(fileName) {
        assetsStillLoading++;

        let spriteImage = new Image();
        spriteImage.src = "assets/sprites/" + fileName;

        spriteImage.onload = function() {
            assetsStillLoading--;
        }

        return spriteImage;
    }
    sprites.background = loadSprite('spr_background4.png');
    sprites.stick = loadSprite('spr_stick.png');
    sprites.whiteBall = loadSprite('spr_ball2.png');
    sprites.redBall = loadSprite('spr_redBall2.png');
    sprites.yellowBall = loadSprite('spr_yellowBall2.png');
    sprites.blackBall = loadSprite('spr_blackBall2.png');

    assetsLoadingLoop(callback);
}

function getBallSpriteByColor(color) {
    switch (color) {
        case COLOR.red:
            return sprites.redBall;
        case COLOR.yellow:
            return sprites.yellowBall;
        case COLOR.black:
            return sprites.blackBall;
        case COLOR.white:
            return sprites.whiteBall;
    }
}