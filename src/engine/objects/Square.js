function Square(ops) {
    ops = ops || {};
    Element.apply(this, arguments);
    this.w = ops.w || 0;
    this.h = ops.h || 0;
    this.color = {
        r: ops.r || 0,
        g: ops.g || 0,
        b: ops.b || 0,
        a: ops.a !== undefined ? ops.a : 1
    };
    this.mouseInteract = true;
}

Square.prototype = Object.create(Element.prototype);

Square.prototype.draw = function () {
    return true;
};

Square.prototype.mouseOver = function () {
    this.color = {
        r: parseInt(255 * Math.random()),
        g: parseInt(255 * Math.random()),
        b: parseInt(255 * Math.random())
    };
};

Square.prototype.mouseOut = function () {
    this.color = {
        r: parseInt(255 * Math.random()),
        g: parseInt(255 * Math.random()),
        b: parseInt(255 * Math.random())
    };
};
