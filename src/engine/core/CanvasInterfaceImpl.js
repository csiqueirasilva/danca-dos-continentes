function CanvasInterfaceImpl() {
    // setting body style
    document.body.style.width = '100%';
    document.body.style.height = '100%';
    document.body.style.padding = '0';
    document.body.style.margin = '0';

    this.mainCanvas = document.createElement('canvas');

    this.mainCanvas.style.position = 'absolute';

    this.ctx = this.mainCanvas.getContext('2d');

    this.w = this.mainCanvas.width = window.innerWidth;
    this.h = this.mainCanvas.height = window.innerHeight;

    document.body.appendChild(this.mainCanvas);
}

CanvasInterfaceImpl.prototype.drawByType = function (element) {
    if (element instanceof DisplayText) {
        this.drawText(element);
    } else if (element instanceof SquareImage) {
        this.drawImage(element);
    } else if (element instanceof Square) {
        this.drawRect(element);
    } else if (element instanceof Line) {
        this.drawLine(element);
    }
};

CanvasInterfaceImpl.prototype.getNDC = function (element, camera) {
    var ndcPos = camera.getNDCPos(element.x, element.y);
    ndcPos.x *= this.w;
    ndcPos.y *= this.h;

    var ndcSize = camera.getNDCSize(element.w, element.h);
    ndcSize.x *= this.w;
    ndcSize.y *= this.h;

    ndcPos.x -= ndcSize.x / 2;
    ndcPos.y -= ndcSize.y / 2;

    return {
        pos: ndcPos,
        size: ndcSize
    };
};

CanvasInterfaceImpl.prototype.setElementPosition = function setElementPosition(element, camera) {
    var elementNDC = this.getNDC(element, camera);
    element.updateNDC(elementNDC);

    var ndc = element._ndc;

    this.ctx.save();

    this.ctx.translate(ndc.pos.x + ndc.size.x / 2, GameInstance.Camera.h - (ndc.pos.y + ndc.size.y / 2));
    this.ctx.rotate(element.rotation);
    this.ctx.scale(element.scaleW, element.scaleH);
};

CanvasInterfaceImpl.prototype.restoreElementPosition = function () {
    this.ctx.restore();
};

CanvasInterfaceImpl.prototype.drawRect = function drawRect(element) {
    var ndc = element._ndc;

    this.ctx.fillStyle = 'rgba(' + element.color.r + ', ' + element.color.g + ', ' + element.color.b + ', ' + element.color.a + ')';
    this.ctx.rect(-ndc.size.x / 2, -ndc.size.y / 2, ndc.size.x, ndc.size.y);
    this.ctx.fill();
};

CanvasInterfaceImpl.prototype.drawBoundingRect = function drawBoundingRect(ndc) {
    this.ctx.strokeStyle = '#000000';
    this.ctx.strokeRect(-ndc.size.x / 2, -ndc.size.y / 2, ndc.size.x, ndc.size.y);
};

CanvasInterfaceImpl.prototype.drawText = function drawText(element) {
    var ndc = element._ndc;

    this.ctx.fillStyle = 'rgb(' + element.color.r + ', ' + element.color.g + ', ' + element.color.b + ')';
    this.ctx.textBaseline = 'top';
    this.ctx.fillText(element.txt, -ndc.size.x / 2, -ndc.size.y / 2);
};

CanvasInterfaceImpl.prototype.drawImage = function drawImage(element) {
    var ndc = element._ndc;

    this.ctx.drawImage(element.img, -ndc.size.x / 2, -ndc.size.y / 2, ndc.size.x, ndc.size.y);
};

CanvasInterfaceImpl.prototype.drawLine = function drawLine(element) {
    var sx = (element.sx / GameInstance.Camera.w) * this.w;
    var sy = -(element.sy / GameInstance.Camera.h) * this.h;

    var ex = (element.ex / GameInstance.Camera.w) * this.w;
    var ey = -(element.ey / GameInstance.Camera.h) * this.h;

    this.ctx.strokeStyle = 'rgb(' + element.color.r + ', ' + element.color.g + ', ' + element.color.b + ')';
    this.ctx.beginPath();
    this.ctx.moveTo(sx, sy);
    this.ctx.lineTo(ex, ey);
    this.ctx.stroke();
    this.ctx.closePath();
};

CanvasInterfaceImpl.prototype.clear = function () {
    this.ctx.clearRect(0, 0, this.w, this.h);
};