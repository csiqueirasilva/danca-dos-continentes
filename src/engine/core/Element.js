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
	this.draggable = false;
	this.rotatable = false;
	this.rotateSpeed = 0.1;
	this._children = [];
	this._parent = null;
	this._ndc = {pos: {x: 0, y: 0}, size: {x: 0, y: 0}};
}

Element.prototype.updateNDC = function (ndc) {
	if (this._parent !== null) {
		this._ndc.pos.x = ndc.pos.x + this._parent._ndc.pos.x;
		this._ndc.pos.y = ndc.pos.y + this._parent._ndc.pos.y;
		this._ndc.size.x = ndc.size.x + this._parent._ndc.size.x;
		this._ndc.size.y = ndc.size.y + this._parent._ndc.size.y;
	} else {
		this._ndc.pos.x = ndc.pos.x;
		this._ndc.pos.y = ndc.pos.y;
		this._ndc.size.x = ndc.size.x;
		this._ndc.size.y = ndc.size.y;
	}
};

Element.prototype.moveRenderOrder = function (element, z) {
	var added = this.isChild(element);
	if (added) {
		this.remove(element);
		element.z = z;
		this.add(element);
	}
	return added;
};

Element.prototype.remove = function (element) {
	var added = this.isChild(element);
	if (added) {
		var idx = this._children[element.z].indexOf(element);
		this._children[element.z].splice(idx, 1);
		element._parent = null;
	}
	return added;
};

Element.prototype.add = function (element) {
	if (element instanceof Element) {
		if (!(this._children[element.z] instanceof Array)) {
			this._children[element.z] = [];
		}
		this._children[element.z].push(element);
		element._parent = this;
	}
};

Element.prototype.isChild = function (element) {
	return element instanceof Element && this._children[element.z] instanceof Array && this._children[element.z].indexOf(element) !== -1;
};

Element.prototype.draw = function () {
	return true;
};

Element.prototype.getCorners = function () {
	var coords = [];

	var posX = this.x;
	var posY = this.y;

	var rot = -this.rotation;

	var w = this.w;
	var h = this.h;

	var scaleH = this.scaleH;
	var scaleW = this.scaleW;

	var top = posY + (h * scaleH) / 2;
	var left = posX - (w * scaleW) / 2;
	var right = posX + (w * scaleW) / 2;
	var down = posY - (h * scaleH) / 2;

	coords.push({x: right, y: top});
	coords.push({x: left, y: top});
	coords.push({x: left, y: down});
	coords.push({x: right, y: down});

	for (var i = 0; i < coords.length; i++) {
		var originalX = coords[i].x - posX;
		var originalY = coords[i].y - posY;

		coords[i].x = originalX * Math.cos(rot) - originalY * Math.sin(rot);
		coords[i].y = originalX * Math.sin(rot) + originalY * Math.cos(rot);

		coords[i].x += posX;
		coords[i].y += posY;
	}

	return coords;
};

Element.prototype.setScale = function (n) {
	this.scaleH = this.scaleW = parseFloat(n);
};

Element.prototype.setZIndex = function (z) {
	if (this._parent !== null && !this._parent.moveRenderOrder(this, z)) {
		this.z = z;
	}
};

(function () {

	function intersects(x1, y1, x2, y2, x3, y3, x4, y4) {
		// src: https://en.wikipedia.org/wiki/Line%E2%80%93line_intersection
		var denominator = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);
		var ret = 0;

		if (denominator !== 0) {
			var pxNumerator = (x1 * y2 - y1 * x2) * (x3 - x4) - (x1 - x2) * (x3 * y4 - y3 * x4);
			var pyNumerator = (x1 * y2 - y1 * x2) * (y3 - y4) - (y1 - y2) * (x3 * y4 - y3 * x4);

			var px = pxNumerator / denominator;
			var py = pyNumerator / denominator;

			var tx1 = (px - x1) / (x2 - x1);
			var ty1 = (py - y1) / (y2 - y1);

			var tx2 = (px - x3) / (x4 - x3);
			var ty2 = (py - y3) / (y4 - y3);

			if (tx1 >= 0 && tx1 <= 1 && ty1 >= 0 && ty1 <= 1 &&
				tx2 >= 0 && tx2 <= 1 && ty2 >= 0 && ty2 <= 1) {
				ret = 1;
			}
		}

		return ret;
	}

	Element.prototype.isPointInside = function (x, y) {

		var ret = false;

		var corners = this.getCorners();

		if (this.rotation % (Math.PI * 2) !== 0) {

			var acc = 0;

			var sx = x - this.w * 100;
			var sy = y;

			var rotatedY0 = sx * Math.sin(this.rotation) + sy * Math.cos(this.rotation);
			var rotatedX0 = sx * Math.cos(this.rotation) - sy * Math.sin(this.rotation);

			var rotatedX1 = x;
			var rotatedY1 = y;

			acc += intersects(corners[0].x, corners[0].y, corners[1].x, corners[1].y, rotatedX0, rotatedY0, rotatedX1, rotatedY1);
			acc += intersects(corners[1].x, corners[1].y, corners[2].x, corners[2].y, rotatedX0, rotatedY0, rotatedX1, rotatedY1);
			acc += intersects(corners[3].x, corners[3].y, corners[0].x, corners[0].y, rotatedX0, rotatedY0, rotatedX1, rotatedY1);
			acc += intersects(corners[2].x, corners[2].y, corners[3].x, corners[3].y, rotatedX0, rotatedY0, rotatedX1, rotatedY1);

			ret = acc % 2 !== 0;

		} else {
			ret = x >= corners[1].x &&
				x <= corners[0].x &&
				y <= corners[0].y &&
				y >= corners[2].y;
		}

		return ret;
	};

})();