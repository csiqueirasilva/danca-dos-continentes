function Element () {
	this.x = 0;
	this.y = 0;
	this.w = 10;
	this.h = 10;
	this.z = 0;
	this.visible = true;
}

Element.prototype.draw = function (ctx, ndcPos, ndcSize) {
	ctx.strokeStyle = '#000000';
	ctx.rect(ndcPos.x, ndcPos.y, ndcSize.x, ndcSize.y);
	ctx.stroke();
};
