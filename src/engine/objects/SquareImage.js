function SquareImage(ops) {
	ops = ops || {};
	Square.apply(this, arguments);

	var instance = this;

	this.ready = false;

	this.img = document.createElement('img');

	this.img.style = 'display: none';

	this.img.onload = function () {

		var canvas = document.createElement('canvas');
		canvas.width = this.width;
		canvas.height = this.height;
		
		instance.w = this.width;
		instance.h = this.height;
		
		canvas.getContext('2d').drawImage(this, 0, 0, this.width, this.height);
		instance.data = canvas.getContext('2d').getImageData(0, 0, this.width, this.height).data;

		delete canvas;

		instance.ready = true;
	};

	this.img.src = ops.imgPath;
}

SquareImage.prototype = Object.create(Square.prototype);

SquareImage.prototype.draw = function () {
	if(this.ready) {
		GameON.Canvas.drawImage(this);
	}
};

SquareImage.prototype.inVisiblePixel = function (mouseX, mouseY) {
	var localX = (mouseX - this.x) / this.scaleW;
	var localY = (mouseY - this.y) / this.scaleH;
	
	var rotateY = localX * Math.sin(this.rotation) + localY * Math.cos(this.rotation);
	var rotateX = localX * Math.cos(this.rotation) - localY * Math.sin(this.rotation);

	var localX = parseInt(rotateX + this.w * 0.5);
	var localY = parseInt(this.h * 0.5 - rotateY);
	
	var dataPos = (localX + localY * this.w) * 4 + 3;
	
	return this.data[dataPos] !== 0;
};

SquareImage.prototype.isPointInside = function (x, y) {
	return Object.getPrototypeOf(Square.prototype).isPointInside.call(this, x, y) && this.inVisiblePixel(x, y);
};