function GameWorld() {
    this.redBalls = [
        new Ball(new Vector2(1056, 433), COLOR.red),      //3
        new Ball(new Vector2(1090, 374), COLOR.red),      //4
        new Ball(new Vector2(1126, 393), COLOR.red),      //8
        new Ball(new Vector2(1126, 472), COLOR.red),      //10
        new Ball(new Vector2(1162, 335), COLOR.red),      //11
        new Ball(new Vector2(1162, 374), COLOR.red),      //12
        new Ball(new Vector2(1162, 452), COLOR.red)       //14
    ];

    this.yellowBalls = [
        new Ball(new Vector2(1022, 413), COLOR.yellow),   //1
        new Ball(new Vector2(1056, 393), COLOR.yellow),   //2
        new Ball(new Vector2(1090, 452), COLOR.yellow),   //6
        new Ball(new Vector2(1126, 354), COLOR.yellow),   //7
        new Ball(new Vector2(1126, 433), COLOR.yellow),   //9
        new Ball(new Vector2(1162, 413), COLOR.yellow),   //13
        new Ball(new Vector2(1162, 491), COLOR.yellow)    //15
    ];

    this.whiteBall = new Ball(new Vector2(413, 413), COLOR.white);
    this.blackBall = new Ball(new Vector2(1090, 413), COLOR.black);

    this.balls = [
        this.yellowBalls[0],
        this.yellowBalls[1],
        this.redBalls[0],
        this.redBalls[1],
        this.blackBall,
        this.yellowBalls[2],
        this.yellowBalls[3],
        this.redBalls[2],
        this.yellowBalls[4],
        this.redBalls[3],
        this.redBalls[4],
        this.redBalls[5],
        this.yellowBalls[5],
        this.redBalls[6],
        this.yellowBalls[6],
        this.whiteBall
    ];

    this.stick = new Stick(new Vector2(413, 413), this.whiteBall.shoot.bind(this.whiteBall));

    this.table = {
        topY: 57,
        rightX: 1443,
        bottomY: 768,
        leftX: 57
    }
}

GameWorld.prototype.handleCollisions = function () {

    for (let i = 0; i < this.balls.length; i++) {
        this.balls[i].collideWith(this.table);

        for (let j = i + 1; j < this.balls.length; j++) {
            const firstBall = this.balls[i];
            const secondBall = this.balls[j];
            firstBall.collideWith(secondBall);
        }
    }
}

GameWorld.prototype.update = function () {
    this.handleCollisions();
    this.stick.update();

    for (let i = 0; i < this.balls.length; i++)
        this.balls[i].update(DELTA);

    if (!this.ballsMoving() && this.stick.shot)
        this.stick.reposition(this.whiteBall.position);
}

GameWorld.prototype.draw = function () {
    Canvas.drawImage(sprites.background, {x:0, y:0});

    this.stick.draw();

    for (let i = 0; i < this.balls.length; i++)
        this.balls[i].draw();
}

GameWorld.prototype.ballsMoving = function () {
    let ballsMoving = false;

    for (let i = 0; i < this.balls.length; i++) {
        if (this.balls[i].moving) ballsMoving = true;
    }

    return ballsMoving;
}

GameWorld.prototype.getBallsSetByColor = function () {
    if (color === COLOR.red)     return this.redBalls;
    if (color === COLOR.yellow)  return this.yellowBalls;
    if (color === COLOR.white)   return this.whiteBall;
    if (color === COLOR.black)   return this.blackBall;
}