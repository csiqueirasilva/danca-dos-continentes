function DisplayText(ops) {
    ops = ops || {};
    Element.apply(this, [ops]);
    this.w = ops.w || 0;
    this.h = ops.h || 0;

    this.txt = ops.txt || "This is a text";

    this.color = {
        r: ops.r || 255,
        g: ops.g || 0,
        b: ops.b || 0
    };
}

DisplayText.prototype = Object.create(Element.prototype);

DisplayText.prototype.setSize = function (n) {
    this.h = (n / 100) * GameInstance.Camera.h;
};

DisplayText.prototype.draw = function () {
    return true;
};

DisplayText.prototype.beforeDraw = function (ctx) {
    var fontSize = (this.h / GameInstance.Camera.h) * GameInstance.Camera.h;

    ctx.font = fontSize + "px " + (this.font || "Arial");

    var txt = this.getText instanceof Function ? this.getText() : this.txt;

    var width = ctx.measureText(txt).width;

    this.w = (width / GameInstance.Camera.w) * GameInstance.Camera.w;
};