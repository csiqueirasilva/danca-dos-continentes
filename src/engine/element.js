function Element () {
	this.x = 0;
	this.y = 0;
	this.w = 0;
	this.h = 0;
	this.z = 0;
	this.visible = true;
}

Element.prototype.draw = function (ctx, ndcPos, ndcSize) {
};
