function Clickable() {
}

Clickable.prototype.mouseOver = function() {
	document.body.style.cursor = 'pointer';
};

Clickable.prototype.mouseOut = function() {
	document.body.style.cursor = 'default';
};