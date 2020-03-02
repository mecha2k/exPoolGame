function GamePolicy() {

    this.turn = 0;
    this.firstCollision = true;

    let player1TotalScore = new Score(new Vector2(Game.size.x / 2 - 75, Game.size.y / 2 - 45));
    let player2TotalScore = new Score(new Vector2(Game.size.x / 2 + 75, Game.size.y / 2 - 45));

    let player1MatchScore = new Score(new Vector2(Game.size.x / 2 - 280, 108));
    let player2MatchScore = new Score(new Vector2(Game.size.x / 2 + 230, 108));

    this.players = [new Player(player1MatchScore, player1TotalScore), new Player(player2MatchScore, player2TotalScore)];

    this.foul = false;
    this.scored = false;
    this.won = false;
    this.turnPlayed = false;
    this.validBallsInsertedOnTurn = 0;

    this.leftBorderX = BORDER_SIZE;
    this.rightBorderX = Game.size.x - BORDER_SIZE;
    this.topBorderY = BORDER_SIZE;
    this.bottomBorderY = Game.size.y - BORDER_SIZE;

    this.topCenterHolePos = new Vector2(750, 32);
    this.bottomCenterHolePos = new Vector2(750, 794);
    this.topLeftHolePos = new Vector2(62, 62);
    this.topRightHolePos = new Vector2(1435, 62);
    this.bottomLeftHolePos = new Vector2(62, 762)
    this.bottomRightHolePos = new Vector2(1435, 762);
}

GamePolicy.prototype.reset = function () {
    this.turn = 0;
    this.players[0].matchScore.value = 0;
    this.players[0].color = undefined;
    this.players[1].matchScore.value = 0;
    this.players[1].color = undefined;
    this.foul = false;
    this.scored = false;
    this.turnPlayed = false;
    this.won = false;
    this.firstCollision = true;
    this.validBallsInsertedOnTurn = 0;
}

GamePolicy.prototype.drawScores = function () {
    Canvas.drawText('PLAYER' + (this.turn + 1), new Vector2(Game.size.x / 2 + 40, 200),
        new Vector2(150, 0), "#096834", "top", "Impact", "70px");

    this.players[0].totalScore.draw();
    this.players[1].totalScore.draw();

    this.players[0].matchScore.drawLines(this.players[0].color);
    this.players[1].matchScore.drawLines(this.players[1].color);
}

GamePolicy.prototype.checkCollisionValid = function (ball1, ball2) {
    let currentPlayerColor = this.players[this.turn].color;

    if(this.players[this.turn].matchScore.value === 7 &&
        (ball1.color === COLOR.black || ball2.color === COLOR.black)) {
        this.firstCollision = false;
        return;
    }

    if(!this.firstCollision) return;

    if(currentPlayerColor === undefined) {
        this.firstCollision = false;
        return;
    }

    if(ball1.color === COLOR.white) {
        if(ball2.color !== currentPlayerColor) this.foul = true;
        this.firstCollision = false;
    }

    if(ball2.color === COLOR.white){
        if(ball1.color !== currentPlayerColor) this.foul = true;
        this.firstCollision = false;
    }
}

GamePolicy.prototype.handleBallInHole = function (ball) {
    
    setTimeout(function() { ball.out(); }, 100);

    let currentPlayer = this.players[this.turn];
    let secondPlayer = this.players[(this.turn + 1) % 2];

    if (currentPlayer.color === undefined) {
        if (ball.color === COLOR.red) {
            currentPlayer.color = COLOR.red;
            secondPlayer.color = COLOR.yellow;
        } else if (ball.color === COLOR.yellow) {
            currentPlayer.color = COLOR.yellow;
            secondPlayer.color = COLOR.red;
        } else if (ball.color === COLOR.black) {
            this.won = true;
            this.foul = true;
        } else if (ball.color === COLOR.white) {
            this.foul = true;
        }
    }

    if (currentPlayer.color === ball.color) {
        currentPlayer.matchScore.increment();
        this.scored = true;
        this.validBallsInsertedOnTurn++;
    } else if (ball.color === COLOR.white) {
        if (currentPlayer.color !== undefined) {
            this.foul = true;

            let ballsSet = Game.gameWorld.getBallsSetByColor(currentPlayer.color);
            let allBallsInHole = true;

            for (let i = 0; i < ballsSet.length; i++)
                if(!ballsSet[i].inHole) allBallsInHole = false;

            if(allBallsInHole) this.won = true;
        }
    } else if (ball.color === COLOR.black) {
        if(currentPlayer.color !== undefined) {
            let ballsSet = Game.gameWorld.getBallsSetByColor(currentPlayer.color);

            for (let i = 0; i < ballsSet.length; i++)
                if(!ballsSet[i].inHole) this.foul = true;
            this.won = true;
        }
    } else {
        secondPlayer.matchScore.increment();
        this.foul = true;
    }
}

GamePolicy.prototype.updateTurnOutcome = function () {

    if (!this.turnPlayed) return;
    if (this.firstCollision === true) this.foul = true;

    if (this.won) {
        if (!this.foul) {
            this.players[this.turn].totalScore.increment();
            if (AI.finishedSession) {
                this.reset();
                setTimeout(function() { Game.gameWorld.reset(); }, 1000);
            }
        } else {
            this.players[(this.turn + 1) % 2].totalScore.increment();
            if (AI.finishedSession) {
                this.reset();
                setTimeout(function() { Game.gameWorld.reset(); }, 1000);
            }
        }
        return;
    }
    if (!this.scored || this.foul) this.switchTurns();

    this.scored = false;
    this.turnPlayed = false;
    this.firstCollision = true;
    this.validBallsInsertedOnTurn = 0;
    setTimeout(function() {Game.gameWorld.whiteBall.visible = true; }, 200);
    if(AI_ON && this.turn === AI_PLAYER_NUM && AI.finishedSession) AI.startSession();
}

GamePolicy.prototype.switchTurns = function () {
    this.turn++;
    this.turn %= 2;
}