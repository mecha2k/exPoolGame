function Canvas2D() {
    this._canvas = document.getElementById('screen');
    this._canvasContext = this._canvas.getContext('2d');
    this._canvasOffset = new Vector2();
}

Canvas2D.prototype.clear = function() {
    this._canvasContext.clearRect(0, 0, this._canvas.width, this._canvas.height);
}

Canvas2D.prototype.drawImage = function(image, position, origin, rotation = 0) {
    if(!position)   position = new Vector2();
    if(!origin)     origin = new Vector2();

    this._canvasContext.save();
    this._canvasContext.translate(position.x, position.y);
    this._canvasContext.rotate(rotation);
    this._canvasContext.drawImage(image, -origin.x, -origin.y);
    this._canvasContext.restore();
}

Canvas2D.prototype.drawText = function (text, position, origin, color, textAlign, fontname, fontsize) {
    let canvasScale = this.scale();

    position = typeof position !== 'undefined' ? position : new Vector2();
    origin = typeof origin !== 'undefined' ? origin : new Vector2();
    color = typeof color !== 'undefined' ? color : COLOR.black;
    textAlign = typeof textAlign !== 'undefined' ? textAlign : "top";
    fontname = typeof fontname !== 'undefined' ? fontname : "sans-serif";
    fontsize = typeof fontsize !== 'undefined' ? fontsize : "20px";

    this._canvasContext.save();
    this._canvasContext.scale(canvasScale.x, canvasScale.y);
    this._canvasContext.translate(position.x - origin.x, position.y - origin.y);
    this._canvasContext.textBaseline = 'top';
    this._canvasContext.font = fontsize + " " + fontname;
    this._canvasContext.fillStyle = color.toString();
    this._canvasContext.textAlign = textAlign;
    this._canvasContext.fillText(text, 0, 0);
    this._canvasContext.restore();
}

Canvas2D.prototype.offset = function () {
    return this._canvasOffset;
}

Canvas2D.prototype.scale = function () {
    return new Vector2(this._canvas.width, this._canvas.height);
}

Canvas2D.prototype.initialize = function (divName, canvasName) {
    this._canvas = document.getElementById(canvasName);
    this._divName = document.getElementById(divName);

    if (this._canvas.getContext)
        this._canvasContext = this._canvas.getContext('2d');
    else {
        alert('Your browser is not HTML5 compatible!');
        return;
    }

    window.onresize = Canvas.prototype.resize;
    this.resize();
}

Canvas2D.prototype.resize = function () {
    let gameCanvas = Canvas._canvas;
    let gameArea = Canvas._divName;
    let widthToHeight = Game.size.x / Game.size.y;
    let newWidth = window.innerWidth;
    let newHeight = window.innerHeight;
    let newWidthToHeight = newWidth / newHeight;

    if (newWidthToHeight > widthToHeight)
        newWidth = newHeight * widthToHeight;
    else
        newHeight = newWidth / widthToHeight;

    gameArea.style.width = newWidth + 'px';
    gameArea.style.height = newHeight + 'px';

    gameArea.style.marginTop = (window.innerHeight - newHeight) / 2 + 'px';
    gameArea.style.marginLeft = (window.innerWidth - newWidth) / 2 + 'px';
    gameArea.style.marginBottom = (window.innerHeight - newHeight) / 2 + 'px';
    gameArea.style.marginRight = (window.innerWidth - newWidth) / 2 + 'px';

    gameCanvas.width = newWidth;
    gameCanvas.height = newHeight;

    let offset = new Vector2();
    if (gameCanvas.offsetParent) {
        do {
            offset.x += gameCanvas.offsetLeft;
            offset.y += gameCanvas.offsetTop;
        } while ((gameCanvas = gameCanvas.offsetParent));
    }

    Canvas._canvasOffset = offset;
}

let Canvas = new Canvas2D();