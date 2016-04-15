function Layer(ops) {
    ops = ops || {};
    Element.apply(this, arguments);

    this.Canvas = new CanvasInterfaceImpl();

    this.Camera = ops.camera || new Camera();

    this.Camera.w = this.Canvas.w;
    this.Camera.h = this.Canvas.h;

    this.x = this.Camera.w / 2;
    this.y = this.Camera.h / 2;
    
    this.autoUpdate = false;
    
    this._domElement = this.Canvas.mainCanvas;
}

Layer.prototype = Object.create(Element.prototype);

Layer.prototype.draw = function () {
    return true;
};

Layer.prototype.drawElement = function (element) {
    if (element.draw(this.Canvas.ctx)) {
        this.Canvas.setElementPosition(element, this.Camera);

        // should check if it is on camera's frame
        this.Canvas.drawByType(element);

        if (GameInstance._debug) {
            this.Canvas.drawBoundingRect(element._ndc);
        }

        this.Canvas.restoreElementPosition();

        this.drawElementCollection(element._children);
    }
};

Layer.prototype.drawElementCollection = function (elementCollection) {
    for (var key in elementCollection) {
        var zElements = elementCollection[key];
        for (var i = 0; i < zElements.length; i++) {
            if (zElements[i].visible) {
                this.drawElement(zElements[i]);
            }
        }
    }
};