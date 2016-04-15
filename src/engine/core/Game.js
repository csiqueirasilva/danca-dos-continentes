function Game(ops) {
    window.GameInstance = this;
    
    ops = ops || {};
    
    this._layers = [];

    this._eventLayer = new EventLayer({
        layers: this._layers
    });

    this.Camera = this._eventLayer.Camera;

    var nLayers = ops.nLayers || 1;

    if (nLayers < 0) {
        nLayers = 1;
    }

    for (var i = 0; i < nLayers; i++) {
        var l = new Layer({
            camera: this.Camera
        });
        this._layers.push(l);
    }

    this.Mouse = this._eventLayer.Mouse;

    this._debug = ops.debug || false;
}

Game.prototype.start = function () {

    function animate() {
        for (var i = 0; i < GameInstance._layers.length; i++) {
            var layer = GameInstance._layers[i];
            if (layer.autoUpdate) {
                layer.Canvas.clear();
                layer.drawElement(layer);
            }
        }
        requestAnimationFrame(animate);
    }

    animate();
};