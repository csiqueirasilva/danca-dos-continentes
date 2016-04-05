function Piece(ops) {
	ops = ops || {};
	SquareImage.apply(this, arguments);
	this.target = {x: 0, y: 0};
	this.snapped = false;
}

Piece.prototype = Object.create(SquareImage.prototype);

Piece.prototype.zLevelUnsnapped = 10;
Piece.prototype.zLevelSnapped = 8;

Piece.prototype.rotationAngle = 6 * Math.PI / 180;

Piece.prototype.snapRadius = (16 / Math.sqrt(1920 * 1920 + 1080 * 1080)) * Math.sqrt(GameON.Canvas.w * GameON.Canvas.w + GameON.Canvas.h * GameON.Canvas.h);

Piece.prototype.snapRotation = 0.0333;

Piece.prototype.mouseDown = Clickable.prototype.mouseDown;

Piece.prototype.mouseUp = Clickable.prototype.mouseOver;

Piece.prototype.mouseOver = function () {
	if (!this.snapped) {
		Clickable.prototype.mouseOver.call(this);
		this._parent.moveRenderOrder(this, this.z + 1);
	}
};

Piece.prototype.mouseOut = function () {
	Clickable.prototype.mouseOut.call(this);
	if (!this.snapped) {
		this._parent.moveRenderOrder(this, this.z - 1);
	}
};

Piece.prototype.onSnapPosition = function () {
	var rot = (this.rotation % (Math.PI * 2)) / (Math.PI * 2);
	if (rot < 0) {
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

Piece.prototype.toSnapPosition = function () {
	this.x = this.target.x;
	this.y = this.target.y;
	this.rotation = 0;
};

Piece.prototype.snap = function () {
	this.snapped = true;
	this.draggable = false;
	this.setZIndex(Piece.prototype.zLevelSnapped);
	var obj = this;
	setTimeout(function() {
		obj.toSnapPosition();
	}, 200);
};

Piece.prototype.mouseMove = function (mouseX, mouseY) {

	if (!this.snapped) {
		if (Clickable.prototype.isDown.call(this)) {
			//image has opacity at this position, interact
			this.draggable = this.inVisiblePixel(mouseX, mouseY);
			if (this.onSnapPosition()) {
				this.draggable = false;
				this.snap();
			}
		}
	} else {
		this.draggable = false;
	}
};

Piece.prototype.mouseWheel = function (mouseX, mouseY, direction, ev) {
	if (!this.snapped && this.inVisiblePixel(mouseX, mouseY)) {
		var rotateSpeed = this.rotationAngle * direction;
		this.rotation += rotateSpeed;

		if (this.onSnapPosition()) {
			this.snap();
		}
	}
};

Piece.prototype.initForGameplay = function (targetData) {
	this.target = targetData[this.name];
	this.target.x *= GameON.Canvas.w;
	this.target.y *= GameON.Canvas.h;
	this.setZIndex(Piece.prototype.zLevelUnsnapped);
	this.snapped = false;
	this.x = (Math.random() * 0.8 - 0.4) * GameON.Camera.w;
	this.y = (Math.random() * 0.8 - 0.4) * GameON.Camera.h;
	this.rotation = Piece.prototype.rotationAngle * parseInt(Math.random() * 100);
};