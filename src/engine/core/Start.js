if (!(GameInstance instanceof Function)) {
    throw "Impossible to instance game. Entry point `GameInstance class` not found.";
}

new GameInstance();

var resizeInterval = window.setInterval(function () {
    if (GameInstance.Camera.w !== window.innerWidth || GameInstance.Camera.h !== window.innerHeight) {
        GameInstance.Camera.w = window.innerWidth;
        GameInstance.Camera.h = window.innerHeight;

        GameInstance._eventLayer.Canvas.mainCanvas.width = window.innerWidth;
        GameInstance._eventLayer.Canvas.mainCanvas.height = window.innerHeight;
        
        for (var i = 0; i < GameInstance._layers.length; i++) {
            var layer = GameInstance._layers[i];
            
            layer.Canvas.mainCanvas.width = window.innerWidth;
            layer.Canvas.mainCanvas.height = window.innerHeight;
            
            layer.x = GameInstance.Camera.w / 2;
            layer.y = GameInstance.Camera.h / 2;
        }
    }
}, 300);

setTimeout(function () {
    GameInstance.start();
    
    if(GameInstance._afterStart instanceof Function) {
       GameInstance._afterStart(); 
    }
    
}, GameInstance._startDelay || 500);