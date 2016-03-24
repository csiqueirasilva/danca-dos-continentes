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