function ClickableText (ops) {
	ops = ops || {};
	DisplayText.apply(this, arguments);
	
	this.mouseInteract = true;
}

ClickableText.prototype = Object.create(DisplayText.prototype);

ClickableText.prototype.mouseOver = Clickable.prototype.mouseOver;
ClickableText.prototype.mouseOut = Clickable.prototype.mouseOut;