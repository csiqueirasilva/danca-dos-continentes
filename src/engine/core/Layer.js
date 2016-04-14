function Layer(ops) {
    ops = ops || {};
    Element.apply(this, arguments);

    this.Canvas = new CanvasInterfaceImpl();

    this.Camera = ops.camera || new Camera();

    this.Camera.w = this.Canvas.w;
    this.Camera.h = this.Canvas.h;

    this.x = this.Camera.w / 2;
    this.y = this.Camera.h / 2;
}

Layer.prototype = Object.create(Element.prototype);


Layer.prototype.draw = function () {
    return true;
};