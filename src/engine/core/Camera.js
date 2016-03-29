function Camera(ops) {
	ops = ops || {};
	Element.apply(this, arguments);

	this.w = ops.w || 880;
	this.h = ops.h || 495;
}

Camera.prototype = Object.create(Element.prototype);

Camera.prototype.getNDCSize = function (x, y) {

	var xcoord = (x / this.w);
	var ycoord = (y / this.h);

	return {x: xcoord, y: ycoord};
};

Camera.prototype.getNDCPos = function (x, y) {

	var xcoord = (x / this.w);
	var ycoord = (y / this.h);

	return {x: xcoord, y: ycoord};
};

Camera.prototype.onFrame = function (e) {
	// check 4 corners on frame
	var coords = e.getCorners();
	
	var acc = 0;

	var limitPosX = this.x + this.w / 2;
	var limitPosY = this.y + this.h / 2;
	var limitNegX = this.x - this.w / 2;
	var limitNegY = this.y - this.h / 2;

	for (var i = 0; i < coords.length; i++) {
		var c = coords[i];

		if (c.x < limitNegX || c.x > limitPosX || c.y < limitNegY || c.y > limitPosY) {
			acc++;
		}
	}

	var ret = true;

	if (acc === 4) {
		ret = false;
	}

	return ret;
};
