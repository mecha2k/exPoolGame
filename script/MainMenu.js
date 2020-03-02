function Label (text, position, origin, color, textAlign, fontname, fontsize) {
    this.text = typeof text !== 'undefined' ? text : '';
    this.position = typeof position !== 'undefined' ? position : new Vector2();
    this.origin = typeof origin !== 'undefined' ? origin : new Vector2();
    this.color = typeof color !== 'undefined' ? color : COLOR.black;
    this.textAlign = typeof textAlign !== 'undefined' ? textAlign : "top";
    this.fontname = typeof fontname !== 'undefined' ? fontname : "Courier New";
    this.fontsize = typeof fontsize !== 'undefined' ? fontsize : "20px";
}

Label.prototype.draw = function() {
    Canvas.drawText
    (this.text, this.position, this.origin, this.color, this.textAlign, this.fontname, this.fontsize);
}

function generateMainMenuLabels (headerText) {
    let labels = [
        new Label(headerText, new Vector2(100, 0), new Vector2(),
            "white", "left", "Courier", "100px"),
        new Label("© 2018 Chen Shmilovich", new Vector2(1250, 700), new Vector2(),
            "white", "left", "Courier", "20px")
    ];

    return labels;
}

function generateMainMenuButtons (inGame) {

    let buttons = [];
    let dev = 0;

    if (inGame) {
        dev = 200;
        buttons.push (new Button (sprites.continueButton, new Vector2(200, 200),
            function() {
                Game.mainMenu.active = false;
                GAME_STOPPED = false;
                setTimeout(Game.continueGame,200);
                sounds.fadeOut(Game.mainMenu.sound);
                },
            sprites.continueButtonHover))
    }

    let muteSprite = sprites.muteButton;
    let muteSpriteHover = sprites.muteButtonHover;

    if (Game.mainMenu.sound && Game.mainMenu.sound.volume === 0) {
        muteSprite = sprites.muteButtonPressed;
        muteSpriteHover = sprites.muteButtonPressedHover;
    }

    let muteButton = new Button(muteSprite, new Vector2(1430, 10),
        function() {
            if(Game.mainMenu.sound.volume === 0) {
                SOUND_ON = true;
                Game.mainMenu.sound.volume = 0.8;
                this.sprite = sprites.muteButton;
                this.hoverSprite = sprites.muteButtonHover;
            } else {
                SOUND_ON = false;
                Game.mainMenu.sound.volume = 0.0;
                this.sprite = sprites.muteButtonPressed;
                this.hoverSprite = sprites.muteButtonPressedHover;
            }
        }, muteSpriteHover);

    let backButton = new Button(sprites.backButton, new Vector2(100, 150),
        function() {
            Game.mainMenu.labels = generateMainMenuLabels("Classic 8-Ball");
            Game.mainMenu.buttons = generateMainMenuButtons(inGame);
        },
        sprites.backButtonHover
    );

    buttons = buttons.concat([
        new Button(sprites.twoPlayersButton, new Vector2(200, dev+200),
            function() {
                AI_ON = false;
                Game.mainMenu.active = false;
                GAME_STOPPED = false;
                setTimeout(Game.startNewGame,200);
                sounds.fadeOut(Game.mainMenu.sound);
            }, sprites.twoPlayersButtonHover),
        new Button(sprites.onePlayersButton, new Vector2(200, dev+400),
            function() {
                Game.mainMenu.labels = generateMainMenuLabels("Choose Difficulty");
                Mouse.reset();
                Game.mainMenu.buttons = [
                    new Button(sprites.easyButton, new Vector2(200, 150),
                        function() {
                            AI_PLAYER_NUM = 1;
                            AI_ON = true;
                            TRAIN_ITER = 30;
                            Game.mainMenu.active = false;
                            GAME_STOPPED = false;
                            setTimeout(Game.startNewGame,200);
                            sounds.fadeOut(Game.mainMenu.sound);
                        }, sprites.easyButtonHover),
                    new Button(sprites.mediumButton, new Vector2(200, 300),
                        function() {
                            AI_PLAYER_NUM = 1;
                            AI_ON = true;
                            TRAIN_ITER = 50;
                            Game.mainMenu.active = false;
                            GAME_STOPPED = false;
                            setTimeout(Game.startNewGame,200);
                            sounds.fadeOut(Game.mainMenu.sound);
                        }, sprites.mediumButtonHover),
                    new Button(sprites.hardButton, new Vector2(200, 450),
                        function() {
                            AI_PLAYER_NUM = 1;
                            AI_ON = true;
                            TRAIN_ITER = 100;
                            Game.mainMenu.active = false;
                            GAME_STOPPED = false;
                            setTimeout(Game.startNewGame,200);
                            sounds.fadeOut(Game.mainMenu.sound);
                        }, sprites.hardButtonHover),
                    new Button(sprites.insaneButton, new Vector2(200, 600),
                        function() {
                            AI_PLAYER_NUM = 0;
                            AI_ON = true;
                            TRAIN_ITER = 700;
                            Game.mainMenu.active = false;
                            GAME_STOPPED = false;
                            setTimeout(Game.startNewGame,200);
                            sounds.fadeOut(Game.mainMenu.sound);
                        }, sprites.insaneButtonHover), muteButton, backButton];
            }, sprites.onePlayersButtonHover), muteButton]);

    return buttons;
}