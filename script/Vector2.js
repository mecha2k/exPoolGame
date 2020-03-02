function Vector2(x = 0, y = 0) {
    this.x = x;
    this.y = y;
}

Vector2.prototype.copy = function () {
    return new Vector2(this.x, this.y);
}

Vector2.prototype.addTo = function (vector) {
    this.x += vector.x;
    this.y += vector.y;
}

Vector2.prototype.scaleTo = function (scale) {
    return new Vector2(this.x * scale, this.y * scale);
}

Vector2.prototype.length = function () {
    return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
}

Vector2.prototype.add = function (vector) {
    return new Vector2(this.x + vector.x, this.y + vector.y);
}

Vector2.prototype.subtract = function (vector) {
    return new Vector2(this.x - vector.x, this.y - vector.y);
}

Vector2.prototype.dot = function (vector) {
    return (this.x * vector.x + this.y * vector.y);
}

Vector2.prototype.isZero = function () {
    return (this.x == 0 && this.y == 0);
}

Vector2.prototype.distanceFrom = function (object) {
    return Math.sqrt((this.x - object.x) * (this.x - object.x) + (this.y - object.y) * (this.y - object.y));
}

Vector2.prototype.equals = function (object) {
    return (this.x == object.x && this.y == object.y);
}