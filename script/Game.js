const LOG = false;

const BALL_SIZE = 38;
const BORDER_SIZE = 57;
const HOLE_RADIUS = 46;

const DELTA = 1/100;

let DISPLAY = true;
let SOUND_ON = true;
let GAME_STOPPED = true;

let KEYBOARD_INPUT_ON = true;

let TRAIN_ITER = 100;
let AI_ON = true;
let AI_PLAYER_NUM = 1;
let DISPLAY_TRAINING = false;

let Game = new PoolGame();

function PoolGame() {
    this.size = undefined;
    this.spritesStillLoading = 0;
    this.gameWorld = undefined;
    this.sound = true;
    this.mainMenu = new Menu();
}

PoolGame.prototype.init = function () {
    this.gameWorld = new GameWorld();
}

PoolGame.prototype.start = function () {
    Game.init();
    Game.mainLoop();
}

PoolGame.prototype.mainLoop = function () {
    Canvas.clear();
    Game.gameWorld.update();
    Game.gameWorld.draw();
    Mouse.reset();

    requestAnimationFrame(Game.mainLoop);
}

PoolGame.prototype.start = function (divName, canvasName, x, y) {
    this.size = new Vector2(x, y);
    Canvas.initialize(divName, canvasName);
    this.loadAssets();
    this.assert
}

PoolGame.prototype.assetLoadingLoop = function () {
    if (!this.spritesStillLoading > 0)
        requestAnimationFrame(Game.assetLoadingLoop);
    else {
        Game.in
    }

}

PoolGame.prototype.initialize = function () {
    this.gameWorld = new GameWorld();
    this.policy = new GamePolicy();
    thi
}

PoolGame.prototype.initMenu = function (inGame) {
    let labels = generateMainMenuLabels("Classic 8-Ball");
    let buttons = generateMainMenuButtons(inGame);

    this.mainMenu.init (sprites.mainMenuBackground, labels, buttons, sounds.jazzTune);
}

PoolGame.prototype.loadAssets = function () {

    Game.loadAssets = function () {
        let loadSprite = function (sprite) { return Game.loadSprite("assets/sprites/" + sprite); };
        let loadSound = function (sound) { return new Audio("assets/sounds/" + sound); };

        sprites.mainMenuBackground = loadSprite("main_menu_background.png");
        sprites.background = loadSprite("spr_background4.png");
        sprites.ball = loadSprite("spr_ball2.png");
        sprites.redBall = loadSprite("spr_redBall2.png");
        sprites.yellowBall = loadSprite("spr_yellowBall2.png");
        sprites.blackBall = loadSprite("spr_blackBall2.png");
        sprites.stick = loadSprite("spr_stick.png");
        sprites.twoPlayersButton = loadSprite("2_players_button.png");
        sprites.twoPlayersButtonHover = loadSprite("2_players_button_hover.png");
        sprites.onePlayersButton = loadSprite("1_player_button.png");
        sprites.onePlayersButtonHover = loadSprite("1_player_button_hover.png");
        sprites.muteButton = loadSprite("mute_button.png");
        sprites.muteButtonHover = loadSprite("mute_button_hover.png");
        sprites.muteButtonPressed = loadSprite("mute_button_pressed.png");
        sprites.muteButtonPressedHover = loadSprite("mute_button_pressed_hover.png");
        sprites.easyButton = loadSprite("easy_button.png");
        sprites.easyButtonHover = loadSprite("easy_button_hover.png");
        sprites.mediumButton = loadSprite("medium_button.png");
        sprites.mediumButtonHover = loadSprite("medium_button_hover.png");
        sprites.hardButton = loadSprite("hard_button.png");
        sprites.hardButtonHover = loadSprite("hard_button_hover.png");
        sprites.backButton = loadSprite("back_button.png");
        sprites.backButtonHover = loadSprite("back_button_hover.png");
        sprites.continueButton = loadSprite("continue_button.png");
        sprites.continueButtonHover = loadSprite("continue_button_hover.png");
        sprites.insaneButton = loadSprite("insane_button.png");
        sprites.insaneButtonHover = loadSprite("insane_button_hover.png");
        sprites.aboutButton = loadSprite("about_button.png");
        sprites.aboutButtonHover = loadSprite("about_button_hover.png");
        sprites.controls = loadSprite("controls.png");

        sounds.side = loadSound("Side.wav");
        sounds.ballsCollide = loadSound("BallsCollide.wav");
        sounds.strike = loadSound("Strike.wav");
        sounds.hole = loadSound("Hole.wav");
        sounds.jazzTune = loadSound("Bossa Antigua.mp3");
    }
}

PoolGame.prototype.loadSprite = function (imageName) {
    let image = new Image();
    image.src = imageName;
    this.spritesStillLoading += 1;
    image.onload = function () { Game.spritesStillLoading -= 1; };
    console.log("Loading sprite: " + imageName);

    return image;
}

PoolGame.prototype.continueGame = function () {
    Canvas._canvas.style.cursor = "auto";
    requestAnimationFrame(Game.mainLoop);
}

PoolGame.prototype.startNewGame = function () {
    Canvas._canvas.style.cursor = "auto";
    Game.gameWorld = new GameWorld();
    Game.policy = new GamePolicy();

    Canvas.clear();
    Canvas.drawImage(sprites.controls, new Vector2(Game.size.x / 2,Game.size.y / 2),
        0, 1, new Vector2(sprites.controls.width / 2,sprites.controls.height / 2));

    setTimeout(() => {
        AI.init(Game.gameWorld, Game.policy);
        if (AI_ON && AI_PLAYER_NUM === 0) AI.startSession();
        Game.mainLoop(); },5000);
}