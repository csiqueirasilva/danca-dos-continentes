function Piece(ops) {
	ops = ops || {};
	SquareImage.apply(this, arguments);
	this.target = {x: 0, y: 0};
}

Piece.prototype = Object.create(SquareImage.prototype);

Piece.prototype.rotationAngle = 6 * Math.PI / 180;

Piece.prototype.snapRadius = (5 / (1920 * 1920 + 1080 * 1080)) * (GameON.Canvas.w * GameON.Canvas.w + GameON.Canvas.h * GameON.Canvas.h);

Piece.prototype.snapRotation = 0.0333;

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

Piece.prototype.onSnapPosition = function () {
	var rot = (this.rotation % (Math.PI * 2)) / (Math.PI * 2);
	if(rot < 0) {
		rot += 1;
	}
	var ret = false;
	if (rot >= (1 - this.snapRotation) || rot <= this.snapRotation) {
		var x = this.target.x - this.x;
		var y = this.target.y - this.y;
		var r = Math.sqrt(x * x + y * y);
		ret = r <= this.snapRadius;
	}
	return ret;
};

Piece.prototype.mouseMove = function (mouseX, mouseY) {

	if (Clickable.prototype.isDown.call(this)) {
		//image has opacity at this position, interact
		this.draggable = this.inVisiblePixel(mouseX, mouseY);
		if (this.onSnapPosition()) {
			console.log(this.name);
		}
	}

};

Piece.prototype.mouseWheel = function (mouseX, mouseY, direction, ev) {
	if (this.inVisiblePixel(mouseX, mouseY)) {
		var rotateSpeed = this.rotationAngle * direction;
		this.rotation += rotateSpeed;
		
		if (this.onSnapPosition()) {
			console.log(this.name);
		}
	}
};