function Square (x, y, r, g, b) {
	Element.apply(this, arguments);
	this.w = x;
	this.h = y;
	this.color = {
		r: r || 0,
		g: g || 0,
		b: b || 0
	};
}

Square.prototype = Object.create(Element.prototype);

Square.prototype.draw = function (ctx, ndcPos, ndcSize) {
	ctx.fillStyle = 'rgb(' + this.color.r + ', ' + this.color.g + ', ' + this.color.b + ')';
	ctx.rect(ndcPos.x, ndcPos.y, ndcSize.x, ndcSize.y);
	ctx.fill();
};

Square.prototype.mouseOver = function (ctx, ndcPos, ndcSize) {
	this.color = {
		r: parseInt(255 * Math.random()),
		g: parseInt(255 * Math.random()),
		b: parseInt(255 * Math.random())
	};
};
