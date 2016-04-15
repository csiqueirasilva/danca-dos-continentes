function DisplayText(ops) {
	ops = ops || {};
	Element.apply(this, [ops]);
	this.w = ops.w || 0;
	this.h = ops.h || 0;

	this.txt = ops.txt || "This is a text";

	this.color = {
		r: ops.r || 255,
		g: ops.g || 0,
		b: ops.b || 0
	};
}

DisplayText.prototype = Object.create(Element.prototype);

DisplayText.prototype.setSize = function (n) {
	this.h = (n / 100) * GameInstance.Camera.h;
};

DisplayText.prototype.setPosition = function (x, y) {
	this.x = (x / 100) * GameInstance.Camera.w;
	this.y = (y / 100) * GameInstance.Camera.h;
};

DisplayText.prototype.draw = function (ctx) {
	var fontSize = (this.h / GameInstance.Camera.h) * GameInstance.Camera.h;

	ctx.font = fontSize + "px " + (this.font || "Arial");

	var width = ctx.measureText(this.txt).width;

	this.w = (width / GameInstance.Camera.w) * GameInstance.Camera.w;

	return true;
};