function EventLayer(ops) {
    ops = ops || {};
    Layer.apply(this, arguments);
    
    if(!(ops.layers instanceof Array)) {
        throw 'Undefined reference to layers. Cannot instance EventLayer.';
    }
    
    this._domElement.style['z-index'] = 10000000;
    
    this.Mouse = new Mouse(this._domElement, this.Camera, ops.layers);
}

EventLayer.prototype = Object.create(Layer.prototype);