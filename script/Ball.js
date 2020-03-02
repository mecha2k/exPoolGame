const BALL_ORIGIN = new Vector2(25, 25);
const BALL_DIAMETER = 38;
const BALL_RADIUS = BALL_DIAMETER / 2;

function Ball(initPos, color) {
    this.initPos = initPos;
    this.position = initPos.copy();
    this.velocity = new Vector2();
    this.moving = false;
    this.sprite = getBallSpriteByColor(color);
    this.visible = true;
    this.inHole = false;
}

Ball.prototype.update = function (delta) {
    this.position.addTo(this.velocity.scaleTo(delta));
    this.velocity = this.velocity.scaleTo(0.984);

    if (this.velocity.length() < 5) {
        this.velocity = new Vector2();
        this.moving = false;
    }
}

Ball.prototype.draw = function () {
    if (!this.visible)
        Canvas.drawImage(this.sprite, this.position, BALL_ORIGIN);
}

Ball.prototype.shoot = function (power, rotation) {
    this.velocity = new Vector2(power * Math.cos(rotation), power * Math.sin(rotation));
    this.moving = true;
}

Ball.prototype.collideWith = function (object) {
    if (object instanceof Ball)
        this.collideWithBall(object);
    else
        this.collideWithTable(object);
}

Ball.prototype.collideWithBall = function (ball) {
    const norm = this.position.subtract(ball.position);
    const dist = norm.length();

    if (dist > BALL_DIAMETER) {
        return;
    }

    // Find minimum translation distance
    const mtd = norm.scaleTo((BALL_DIAMETER - dist) / dist);

    // Push-pull balls apart
    this.position = this.position.add(mtd.scaleTo(0.5));
    ball.position = ball.position.subtract(mtd.scaleTo(0.5));

    const unitNorm = norm.scaleTo(1 / norm.length());
    const unitTan = new Vector2(-unitNorm.y, unitNorm.x);

    const v1n = unitNorm.dot(this.velocity);
    const v1t = unitTan.dot(this.velocity);
    const v2n = unitNorm.dot(ball.velocity);
    const v2t = unitTan.dot(ball.velocity);

    let v1nTag = v2n;
    let v2nTag = v1n;

    v1nTag = unitNorm.scaleTo(v1nTag);
    const v1tTag = unitTan.scaleTo(v1t);
    v2nTag = unitNorm.scaleTo(v2nTag);
    const v2tTag = unitTan.scaleTo(v2t);

    this.velocity = v1nTag.add(v1tTag);
    ball.velocity = v2nTag.add(v2tTag);

    this.moving = true;
    ball.moving = true;
}

Ball.prototype.collideWithTable = function (table) {
    if (!this.moving) return;

    let collided = false;

    if (this.position.y <= table.topY + BALL_RADIUS) {
        this.velocity = new Vector2(this.velocity.x, -this.velocity.y);
        collided = true;
    }

    if (this.position.x >= table.rightX - BALL_RADIUS) {
        this.velocity = new Vector2(-this.velocity.x, this.velocity.y);
        collided = true;
    }
    if (this.position.y >= table.bottomY - BALL_RADIUS) {
        this.velocity = new Vector2(this.velocity.x, -this.velocity.y);
        collided = true;
    }

    if (this.position.x <= table.leftX + BALL_RADIUS) {
        this.velocity = new Vector2(-this.velocity.x, this.velocity.y);
        collided = true;
    }

    if (collided === true)
        this.velocity = this.velocity.scaleTo(0.984);
}

Ball.prototype.out = function () {
    this.position = new Vector2(0, 900);
    this.visible = false;
    this.inHole = true;
}

Ball.prototype.reset = function () {
    this.inHole = false;
    this.moving = false;
    this.velocity = Vector2();
    this.position = this.initPos;
    this.visible = true;
}

Ball.prototype.stop = function () {
    this.moving = false;
    this.velocity = Vector2();
}

Ball.prototype.updatePosition = function (delta) {
    if (!this.moving || this.inHole) return;

    let ball = this;
    let newPos = this.position.add(this.velocity.scaleTo(delta));








}