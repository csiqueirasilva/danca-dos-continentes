function CanvasInterfaceImpl() {
	// setting body style
	document.body.style.width = '100%';
	document.body.style.height = '100%';
	document.body.style.padding = '0';
	document.body.style.margin = '0';

	this.mainCanvas = document.createElement('canvas');
	this.ctx = this.mainCanvas.getContext('2d');

	this.w = this.mainCanvas.width = window.innerWidth;
	this.h = this.mainCanvas.height = window.innerHeight;

	document.body.appendChild(this.mainCanvas);
}

CanvasInterfaceImpl.prototype.setElementPosition = function setElementPosition(ndc, rotation) {
	this.ctx.save();
	this.ctx.translate(ndc.pos.x + ndc.size.x / 2, ndc.pos.y + ndc.size.y / 2);
	this.ctx.rotate(rotation);
};

CanvasInterfaceImpl.prototype.drawRect = function drawRect(element) {
	var ndc = GameON.getNDC(element);

	this.setElementPosition(ndc, element.rotation);

	this.ctx.fillStyle = 'rgb(' + element.color.r + ', ' + element.color.g + ', ' + element.color.b + ')';
	this.ctx.rect(-ndc.size.x / 2, -ndc.size.y / 2, ndc.size.x, ndc.size.y);
	this.ctx.fill();

	this.ctx.restore();
};

CanvasInterfaceImpl.prototype.drawBoundingRect = function drawBoundingRect(ndc) {
	this.ctx.strokeStyle = '#000000';
	this.ctx.strokeRect(-ndc.size.x / 2, -ndc.size.y / 2, ndc.size.x, ndc.size.y);
};

CanvasInterfaceImpl.prototype.drawText = function drawText(element) {

	var fontSize = ((element.h / GameON.Camera.h) * element.scaleH) * this.h;

	this.ctx.font = fontSize + "px " + (element.font || "Arial");

	var width = this.ctx.measureText(element.txt).width;

	element.w = (width / this.w) * GameON.Camera.w;

	var ndc = GameON.getNDC(element);

	this.setElementPosition(ndc, element.rotation);

	this.ctx.fillStyle = 'rgb(' + element.color.r + ', ' + element.color.g + ', ' + element.color.b + ')';
	this.ctx.textBaseline = 'top';
	this.ctx.fillText(element.txt, -ndc.size.x / 2, -ndc.size.y / 2);

	if (GameON.DEBUG_MODE) {
		this.drawBoundingRect(ndc);
	}

	this.ctx.restore();
};

CanvasInterfaceImpl.prototype.drawImage = function drawImage(element) {
	var ndc = GameON.getNDC(element);

	this.setElementPosition(ndc, element.rotation);

	this.ctx.drawImage(element.img, -ndc.size.x / 2, -ndc.size.y / 2, ndc.size.x, ndc.size.y);

	if (GameON.DEBUG_MODE) {
		this.drawBoundingRect(ndc);
	}

	this.ctx.restore();
};

CanvasInterfaceImpl.prototype.drawLine = function drawLine(element) {

	var ndc = GameON.getNDC(element);

	this.setElementPosition(ndc, element.rotation);

	var sx = (element.sx / GameON.Camera.w) * this.w;
	var sy = -(element.sy / GameON.Camera.h) * this.h;

	var ex = (element.ex / GameON.Camera.w) * this.w;
	var ey = -(element.ey / GameON.Camera.h) * this.h;

	this.ctx.strokeStyle = 'rgb(' + element.color.r + ', ' + element.color.g + ', ' + element.color.b + ')';
	this.ctx.beginPath();
	this.ctx.moveTo(sx, sy);
	this.ctx.lineTo(ex, ey);
	this.ctx.stroke();
	this.ctx.closePath();

	this.ctx.restore();
};

CanvasInterfaceImpl.prototype.clear = function () {
	this.ctx.clearRect(0, 0, this.w, this.h);
};