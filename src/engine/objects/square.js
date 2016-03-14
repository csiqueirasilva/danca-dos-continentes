function Square (ops) {
	ops = ops || {};	
	Element.apply(this, arguments);
	this.w = ops.w || 0;
	this.h = ops.h || 0;
	this.color = {
		r: ops.r || 0,
		g: ops.g || 0,
		b: ops.b || 0
	};
	this.mouseInteract = true;
}

Square.prototype = Object.create(Element.prototype);

Square.prototype.draw = function (ctx, ndcPos, ndcSize) {
	ctx.fillStyle = 'rgb(' + this.color.r + ', ' + this.color.g + ', ' + this.color.b + ')';
	ctx.rect(ndcPos.x, ndcPos.y, ndcSize.x, ndcSize.y);
	ctx.fill();
};

Square.prototype.mouseOver = function () {
	this.color = {
		r: parseInt(255 * Math.random()),
		g: parseInt(255 * Math.random()),
		b: parseInt(255 * Math.random())
	};
};

Square.prototype.mouseOut = function () {
	this.color = {
		r: parseInt(255 * Math.random()),
		g: parseInt(255 * Math.random()),
		b: parseInt(255 * Math.random())
	};
};
