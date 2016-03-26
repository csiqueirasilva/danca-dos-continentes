function DisplayText (ops) {
	ops = ops || {};
	Element.apply(this, arguments);
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
	this.h = (n / 100) * GameON.Camera.h;
};

DisplayText.prototype.draw = function () {
	GameON.drawText(this);
};

DisplayText.prototype.mouseOver = function () {
	this.color = {
		r: parseInt(255 * Math.random()),
		g: parseInt(255 * Math.random()),
		b: parseInt(255 * Math.random())
	};
};

DisplayText.prototype.mouseOut = function () {
	this.color = {
		r: parseInt(255 * Math.random()),
		g: parseInt(255 * Math.random()),
		b: parseInt(255 * Math.random())
	};
};
