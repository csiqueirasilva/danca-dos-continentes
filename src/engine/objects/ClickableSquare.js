function ClickableSquare (ops) {
	ops = ops || {};
	Square.apply(this, arguments);
	
	this.mouseInteract = true;
}

ClickableSquare.prototype = Object.create(Square.prototype);

ClickableSquare.prototype.mouseUp = Clickable.prototype.mouseUp;
ClickableSquare.prototype.mouseDown = Clickable.prototype.mouseDown;
ClickableSquare.prototype.mouseOver = Clickable.prototype.mouseOver;
ClickableSquare.prototype.mouseOut = Clickable.prototype.mouseOut;