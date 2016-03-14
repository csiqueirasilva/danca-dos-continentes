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

Element.prototype.getCorners = function() {
	var coords = [];
	
	var top = this.y + this.h / 2;
	var left = this.x - this.w / 2;
	var right = this.x + this.w / 2;
	var down = this.y - this.h / 2;	
	
	coords.push({x: right, y: top});
	coords.push({x: left, y: top});
	coords.push({x: right, y: down});
	coords.push({x: left, y: down});
	
	return coords;
};