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

		console.log(instance.data);

		delete canvas;

		instance.ready = true;
	};

	this.img.src = ops.imgPath;
}

SquareImage.prototype = Object.create(Square.prototype);

SquareImage.prototype.draw = function (ctx, ndcPos, ndcSize) {
	if (this.ready) {
		ctx.drawImage(this.img, ndcPos.x, ndcPos.y, ndcSize.x, ndcSize.y);
	}
};

SquareImage.prototype.mouseMove = function (mouseX, mouseY) {
	var localX = parseInt((mouseX - this.x) + this.w * 0.5);
	var localY = parseInt(this.h * 0.5 - (mouseY - this.y));
	
	var dataPos = (localX + localY * this.w) * 4 + 3;
	
	if(this.data[dataPos] !== 0) {
		//image has opacity at this position, interact
		GameON.Mouse.dragElement(this);
	}
};