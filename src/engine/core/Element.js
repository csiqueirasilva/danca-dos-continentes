function Element() {
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

Element.prototype.getCorners = function () {
	var coords = [];

	var top = this.y + (this.h * this.scaleH) / 2;
	var left = this.x - (this.w * this.scaleW) / 2;
	var right = this.x + (this.w * this.scaleW) / 2;
	var down = this.y - (this.h * this.scaleH) / 2;

	coords.push({x: right, y: top});
	coords.push({x: left, y: top});
	coords.push({x: right, y: down});
	coords.push({x: left, y: down});

	return coords;
};

Element.prototype.setScale = function (n) {
	this.scaleH = this.scaleW = parseFloat(n);
};

(function () {

	var label = 0;

	function intersects(x1, y1, x2, y2, x3, y3, x4, y4) {
		// src: https://en.wikipedia.org/wiki/Line%E2%80%93line_intersection
		var denominator = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);
		var ret = 0;

		if (denominator !== 0) {
			var pxNumerator = (x1 * y2 - y1 * x2) * (x3 - x4) - (x1 - x2) * (x3 * y4 - y3 * x4);
			var pyNumerator = (x1 * y2 - y1 * x2) * (y3 - y4) - (y1 - y2) * (x3 * y4 - y3 * x4);

			var px = pxNumerator / denominator;
			var py = pyNumerator / denominator;

			//console.log(++label, px, py, x1, y1, x2, y2);

			if ((px >= x1 && px < x2 ||
				px > x2 && px <= x1) &&
				(py >= y1 && py < y2 ||
					py > y2 && py <= y1
					)) {
				ret = 1;
			}
		}
		return ret;
	}

	var linha = 0;

	Element.prototype.isPointInside = function (x, y) {

		label = 0;

		var corners = this.getCorners();
		var acc = 0;

		var sx = x - this.w * 100;
		var sy = y;

		var rotatedY0 = sx * Math.sin(this.rotation) + sy * Math.cos(this.rotation);
		var rotatedX0 = sx * Math.cos(this.rotation) - sy * Math.sin(this.rotation);

		var rotatedX1 = x;
		var rotatedY1 = y;

		var rot = this.rotation;

		for (var i = 0; i < corners.length; i++) {
			var originalX = corners[i].x - this.x;
			var originalY = corners[i].y - this.y;

			corners[i].y = originalX * Math.sin(rot) + originalY * Math.cos(rot)
				;
			corners[i].x = originalX * Math.cos(rot) - originalY * Math.sin(rot)
				;
		}

		if (linha++ === 0) {

			var l = new Line({r: 255, g: 255});

			l.sx = corners[0].x;
			l.sy = corners[0].y;
			l.ex = corners[1].x;
			l.ey = corners[1].y;

			GameON.add(l);

			var l = new Line({r: 255, g: 255});

			l.sx = corners[1].x;
			l.sy = corners[1].y;
			l.ex = corners[3].x;
			l.ey = corners[3].y;

			GameON.add(l);

			var l = new Line({r: 255, g: 255});

			l.sx = corners[2].x;
			l.sy = corners[2].y;
			l.ex = corners[0].x;
			l.ey = corners[0].y;

			GameON.add(l);

			var l = new Line({r: 255, g: 255});

			l.sx = corners[3].x;
			l.sy = corners[3].y;
			l.ex = corners[2].x;
			l.ey = corners[2].y;

			GameON.add(l);

			l = new Line({b: 255, g: 255});

			l.sx = rotatedX0;
			l.sy = rotatedY0;
			l.ex = rotatedX1;
			l.ey = rotatedY1;

			GameON.add(l);
		}

		acc += intersects(corners[0].x, corners[0].y, corners[1].x, corners[1].y, rotatedX0, rotatedY0, rotatedX1, rotatedY1);
		//acc += intersects(corners[1].x, corners[1].y, corners[2].x, corners[2].y, rotatedX0, rotatedY0, rotatedX1, rotatedY1);
		//acc += intersects(corners[2].x, corners[2].y, corners[3].x, corners[3].y, rotatedX0, rotatedY0, rotatedX1, rotatedY1);
		//acc += intersects(corners[3].x, corners[3].y, corners[0].x, corners[0].y, rotatedX0, rotatedY0, rotatedX1, rotatedY1);

		return acc % 2 ? false : true;
	};

})();