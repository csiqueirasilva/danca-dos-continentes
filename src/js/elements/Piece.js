function Piece(ops) {
	ops = ops || {};
	SquareImage.apply(this, arguments);
}

Piece.prototype = Object.create(SquareImage.prototype);

Piece.prototype.mouseDown = Clickable.prototype.mouseDown;

Piece.prototype.mouseUp = Clickable.prototype.mouseOver;

Piece.prototype.mouseOver = function () {
	Clickable.prototype.mouseOver.call(this);
	this._parent.moveRenderOrder(this, this.z + 1);
};

Piece.prototype.mouseOut = function () {
	Clickable.prototype.mouseOut.call(this);
	this._parent.moveRenderOrder(this, this.z - 1);
};

Piece.prototype.mouseMove = function (mouseX, mouseY) {
	//image has opacity at this position, interact
	this.draggable = Clickable.prototype.isDown.call(this) && this.inVisiblePixel(mouseX, mouseY);
};

Piece.prototype.mouseWheel = function (mouseX, mouseY, direction, ev) {
	if (this.inVisiblePixel(mouseX, mouseY)) {
		var rotateSpeed = 0.1 * direction;
		this.rotation += rotateSpeed;
	}
};