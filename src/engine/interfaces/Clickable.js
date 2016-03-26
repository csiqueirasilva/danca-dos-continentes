function Clickable() {
}

Clickable.prototype.mouseDown = function (x, y, ev) {
	if(ev.button === GameON.Mouse.MOUSE_BTN.LEFT) {
		this._clickable_down = true;
	}
};

Clickable.prototype.mouseUp = function (ev) {
	if(ev.button === GameON.Mouse.MOUSE_BTN.LEFT && this._clickable_down === true && this.clickCallback instanceof Function) {
		this.clickCallback();
	}
};

Clickable.prototype.mouseOver = function() {
	document.body.style.cursor = 'pointer';
	this._clickable_down = false;
};

Clickable.prototype.mouseOut = function() {
	document.body.style.cursor = 'default';
};