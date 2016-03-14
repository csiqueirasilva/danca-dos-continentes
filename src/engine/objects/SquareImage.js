function SquareImage (ops) {
	ops = ops || {};
	Square.apply(this, arguments);

	var instance = this;
	
	this.ready = false;
	
	this.img = document.createElement('img');
	
	this.img.style = 'display: none';
	
	this.img.onload = function () {
		instance.ready = true;
	};
	
	this.img.src = ops.imgPath;
	
	document.body.appendChild(this.img);
}

SquareImage.prototype = Object.create(Square.prototype);

SquareImage.prototype.draw = function (ctx, ndcPos, ndcSize) {
	if(this.ready) {
		ctx.drawImage(this.img, ndcPos.x, ndcPos.y, ndcSize.x, ndcSize.y);
	}
};