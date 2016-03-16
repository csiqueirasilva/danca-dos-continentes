function Element () {
	this.x = 0;
	this.y = 0;
	this.scaleW = 1;
	this.scaleH = 1;
	this.rotation = 0;
	this.w = 0;
	this.h = 0;
	this.z = 0;
	this.visible = true;
	this.mouseInteract = false;
}

Element.prototype.draw = function () {
};

Element.prototype.getCorners = function() {
	var coords = [];
	
	var top = this.y + (this.h * this.scaleH) / 2;
	var left = this.x - (this.w * this.scaleW)/ 2;
	var right = this.x + (this.w * this.scaleW) / 2;
	var down = this.y - (this.h * this.scaleH) / 2;	
	
	coords.push({x: right, y: top});
	coords.push({x: left, y: top});
	coords.push({x: right, y: down});
	coords.push({x: left, y: down});
	
	return coords;
};

Element.prototype.setScale = function(n) {
	this.scaleH = this.scaleW = parseFloat(n);
};

(function() {

	function checkSegments(corners, x, y, idx0, idx1) {
		var ret = 0;
		
		var my = corners[1].y - corners[0].y;
		var mx = corners[1].x - corners[0].x;

		if(mx === 0) /* vertical */ {
			// x = n
			
			
		} else if (my === 0) /* horizontal */ {
			// y = n
		} else {
			var m = my / mx;
			var yseg = m * (corners[idx1].x - corners[idx0].x) - corners[idx0].y;

			if(yseg >= corners[idx0].y && yseg < corners[idx1].y || yseg > corners[idx1].y && yseg <= corners[idx0].y) {
				ret = 1;
			}
		}
		
		return ret;
	}

	Element.prototype.isPointInside = function (x, y) {

		var corners = this.getCorners();

		for(var i = 0; i < corners.length; i++) {
			corners[i].x = corners[i].x * Math.cos(this.rotation) - corners[i].y * Math.sin(this.rotation);
			corners[i].y = corners[i].x * Math.sin(this.rotation) + corners[i].y * Math.cos(this.rotation);
		}

		



		ret = x <= corners[0].x && x >= corners[1].x && y <= corners[0].y && y >= corners[2].y;

		var ret = false;

		var localX = (x - this.x) / this.scaleW;
		var localY = (y - this.y) / this.scaleH;

		var rotateY = localX * Math.sin(this.rotation) + localY * Math.cos(this.rotation);
		var rotateX = localX * Math.cos(this.rotation) - localY * Math.sin(this.rotation);

		console.log(rotateY, rotateX);

		return ret;
	};

})();