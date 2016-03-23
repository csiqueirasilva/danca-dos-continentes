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
}

Element.prototype.draw = function () {
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

(function () {

    var label = 0;

    var interLinha;

    function intersects(x1, y1, x2, y2, x3, y3, x4, y4) {
        // src: https://en.wikipedia.org/wiki/Line%E2%80%93line_intersection
        var denominator = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);
        var ret = 0;

        if (denominator !== 0) {
            var pxNumerator = (x1 * y2 - y1 * x2) * (x3 - x4) - (x1 - x2) * (x3 * y4 - y3 * x4);
            var pyNumerator = (x1 * y2 - y1 * x2) * (y3 - y4) - (y1 - y2) * (x3 * y4 - y3 * x4);

            var px = pxNumerator / denominator;
            var py = pyNumerator / denominator;

            console.clear();
            console.log(px, py, x1, y1, x2, y2);

            console.log(x1 + " < " + px + " < " + x2);
            console.log(y1 + " < " + py + " < " + y2);

            if ((px >= x1 && px < x2 ||
                    px > x2 && px <= x1) &&
                    (py >= y1 && py < y2 ||
                            py > y2 && py <= y1
                            )) {
                ret = 1;
                interLinha.sx = px;
                interLinha.sy = py;
                interLinha.visible = true;
            } else {
                interLinha.visible = false;
            }
        }

        return ret;
    }

    var linha = 0;

    var l = [];

    Element.prototype.isPointInside = function (x, y) {

        label = 0;

        var corners = this.getCorners();
        var acc = 0;

        var sx = x - this.w * 100;
        var sy = y;

        var rotatedY0 = sx * Math.sin(this.rotation) + sy * Math.cos(this.rotation);
        var rotatedX0 = sx * Math.cos(this.rotation) - sy * Math.sin(this.rotation);

        var rotatedX1 = x;
        var rotatedY1 = y;

        if (linha++ === 0) {

            interLinha = new Line({g: 255});
            GameON.add(interLinha);

            interLinha.sx = interLinha.sy = 0;
            interLinha.visible = false;

            var instanceLine = new Line({r: 255, g: 255});
            GameON.add(instanceLine);

            l.push(instanceLine);

            instanceLine = new Line({r: 255, g: 255});

            GameON.add(instanceLine);

            l.push(instanceLine);

            instanceLine = new Line({r: 255, g: 255});

            GameON.add(instanceLine);

            l.push(instanceLine);

            instanceLine = new Line({r: 255, g: 255});

            GameON.add(instanceLine);

            l.push(instanceLine);

            instanceLine = new Line({b: 255, g: 255});

            GameON.add(instanceLine);

            l.push(instanceLine);
        }

        l[0].sx = corners[0].x;
        l[0].sy = corners[0].y;
        l[0].ex = corners[1].x;
        l[0].ey = corners[1].y;


        l[1].sx = corners[1].x;
        l[1].sy = corners[1].y;
        l[1].ex = corners[2].x;
        l[1].ey = corners[2].y;

        l[2].sx = corners[3].x;
        l[2].sy = corners[3].y;
        l[2].ex = corners[0].x;
        l[2].ey = corners[0].y;


        l[3].sx = corners[2].x;
        l[3].sy = corners[2].y;
        l[3].ex = corners[3].x;
        l[3].ey = corners[3].y;


        l[4].sx = rotatedX0;
        l[4].sy = rotatedY0;
        l[4].ex = rotatedX1;
        l[4].ey = rotatedY1;

        acc += intersects(corners[0].x, corners[0].y, corners[1].x, corners[1].y, rotatedX0, rotatedY0, rotatedX1, rotatedY1);
//        acc += intersects(corners[1].x, corners[1].y, corners[2].x, corners[2].y, rotatedX0, rotatedY0, rotatedX1, rotatedY1);
//        acc += intersects(corners[3].x, corners[3].y, corners[0].x, corners[0].y, rotatedX0, rotatedY0, rotatedX1, rotatedY1);
//        acc += intersects(corners[2].x, corners[2].y, corners[3].x, corners[3].y, rotatedX0, rotatedY0, rotatedX1, rotatedY1);

        return acc % 2 ? false : true;
    };

})();