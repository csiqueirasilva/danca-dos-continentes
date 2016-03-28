function Line(ops) {
	ops = ops || {};	
	Element.apply(this, arguments);
	
	this.sx = ops.sx || 0;
	this.sy = ops.sy || 0;
	
	this.ex = ops.ex || 0;
	this.ey = ops.ey || 0;
	
	this.w = this.h = 1;
	
	this.color = {
		r: ops.r || 0,
		g: ops.g || 0,
		b: ops.b || 0
	};
}

Line.prototype = Object.create(Element.prototype);

Line.prototype.draw = function () {
	return true;
};