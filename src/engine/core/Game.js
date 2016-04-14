var GameON = (function () {

    function Game(ops) {
        ops = ops || {};

        this.Camera = new Camera();

        var nLayers = ops.nLayers || 1;

        if (nLayers < 0) {
            nLayers = 1;
        }

        this._layers = [];

        for (var i = 0; i < nLayers; i++) {
            var l = new Layer({
                camera: this.Camera
            });
            this._layers.push(l);
        }

        this.Canvas = this._layers[0].Canvas;

        this.Mouse = new Mouse(this.Canvas.mainCanvas, this.Camera, this._layers[0]._children);

        this._debug = ops.debug || false;
    }

    Game.prototype.add = function (element) {
        this._layers[0].add(element);
    };

    Game.prototype.remove = function (element) {
        this._layers[0].remove(element);
    };

    Game.prototype.start = function () {

        function animate() {
            GameON.Canvas.clear();
            GameON.drawElement(GameON._layers[0]);
            requestAnimationFrame(animate);
        }

        animate();
    };

    Game.prototype.drawElement = function (element) {
        if (element.draw(this.Canvas.ctx)) {
            this.Canvas.setElementPosition(element, this.Camera);

            // should check if it is on camera's frame
            this.Canvas.drawByType(element);

            if (this._debug) {
                this.Canvas.drawBoundingRect(element._ndc);
            }

            this.Canvas.restoreElementPosition();

            this.drawElementCollection(element._children);
        }
    };

    Game.prototype.drawElementCollection = function (elementCollection) {
        for (var key in elementCollection) {
            var zElements = elementCollection[key];
            for (var i = 0; i < zElements.length; i++) {
                if (zElements[i].visible) {
                    this.drawElement(zElements[i]);
                }
            }
        }
    };

    var GameInstance = new Game();

    var resizeInterval = window.setInterval(function () {
        if (GameInstance.Canvas.w !== window.innerWidth || GameInstance.Canvas.h !== window.innerHeight) {
            GameInstance.Camera.w = GameInstance.Canvas.w = GameInstance.Canvas.mainCanvas.width = window.innerWidth;
            GameInstance.Camera.h = GameInstance.Canvas.h = GameInstance.Canvas.mainCanvas.height = window.innerHeight;

            for (var i = 0; i < GameInstance._layers.length; i++) {
                var layer = GameInstance._layers[i];
                layer.x = GameInstance.Camera.w / 2;
                layer.y = GameInstance.Camera.h / 2;
            }
        }
    }, 300);

    return GameInstance;

})();