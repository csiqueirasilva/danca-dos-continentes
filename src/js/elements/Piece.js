function Piece(ops) {
	ops = ops || {};
	SquareImage.apply(this, arguments);
}

Piece.prototype = Object.create(SquareImage.prototype);

Piece.prototype.mouseOver = function () {
	GameON.moveRenderOrder(this, this.z + 1);
};

Piece.prototype.mouseOut = function () {
	GameON.moveRenderOrder(this, this.z - 1);
};

Piece.prototype.mouseMove = function (mouseX, mouseY) {
	//image has opacity at this position, interact
	this.draggable = this.inVisiblePixel(mouseX, mouseY);
};

Piece.prototype.mouseWheel = function (mouseX, mouseY, direction, ev) {
	if (this.inVisiblePixel(mouseX, mouseY)) {
		var rotateSpeed = 0.1 * direction;
		this.rotation += rotateSpeed;
	}
};