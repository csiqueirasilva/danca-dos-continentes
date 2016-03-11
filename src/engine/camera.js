function Camera (w, h) {
	Element.apply(this, arguments);
	
	this.w = w || 160;
	this.h = h || 90;
}

Camera.prototype = Object.create(Element.prototype);

Camera.prototype.getNDCSize = function(x, y) {
	
	var xcoord = (x / this.w);
	var ycoord = (y / this.h);
	
	return {x: xcoord, y: ycoord};
};

Camera.prototype.getNDCPos = function(x, y) {
	
	var xcoord = (x / this.w) + 0.5;
	var ycoord = 0.5 - (y / this.h);
	
	return {x: xcoord, y: ycoord};
};

Camera.prototype.onFrame = function(e) {
	// check 4 corners on frame
	var coords = e.getCorners();
	
	var acc = 0;
	
	for(var i = 0; i < coords.length; i++) {
		var ndc = this.getNDCPos(coords[i]);
		if(ndc.x < 0 || ndc.x > 1 || ndc.y < 0 || ndc.y > 1) {
			acc++;
		}
	}

	var ret = true;

	if(acc === 4) {
		ret = false;
	}
	
	return ret;
};
