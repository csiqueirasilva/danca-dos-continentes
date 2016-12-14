function Map(ops) {
    ops = ops || {};
    SquareImage.apply(this, arguments);
    this.pieceCounter = 0;
    this.key = ops.key;
    this._endGameCallback = null;
    this.visible = false;
    this.pieceTable = {};
}

Map.prototype = Object.create(SquareImage.prototype);

Map.prototype.NUM_PIECES = Piece.prototype.NAMES.length;

Map.prototype.INACTIVITY_INTERVAL = null;

Map.prototype.INACTIVITY_MS_TIME = 30 * 1000;
Map.prototype.INACTIVITY_MS_WARNING_TIME = 20 * 1000;

Map.prototype.NAMES = {
    'futuro': 'Futuro',
    'atual': 'Atual',
    'pangeia': 'Pangeia',
    'rodinia': 'Rodínia'
};

Map.prototype.MAIN_MENU_REF = {
    'rodinia': {x: -21, y: 15.25, w: 0.333, h: 0.35},
    'atual': {x: 23.5, y: -20.5, w: 0.312, h: 0.34},
    'pangeia': {x: -14, y: -21.5, w: 0.32, h: 0.35},
    'futuro': {x: 17.25, y: 17.75, w: 0.31, h: 0.35}
};

(function () {

    function loadData(val) {

        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function ()
        {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                if (xhr.status === 200) {
                    Map.prototype.COORDS[val] = JSON.parse(xhr.responseText);
                } else {
                    throw "Error while loading data for map " + val;
                    if (error)
                        error(xhr);
                }
            }
        };

        xhr.open("GET", "js/data/coords/" + val + ".js", false);
        xhr.send();
    }

    Map.prototype.COORDS = {};

    for (var key in Map.prototype.NAMES) {
        loadData(key);
    }

})();

Map.prototype.initForGameplay = function (endGameCallback) {
    
    Piece.prototype.SPAWN_IDX = 0;
    
    this.visible = true;
    this.pieceCounter = 0;
    this.pieceTable = {};
    if (!(endGameCallback instanceof Function)) {
        throw "Undefined end game callback";
    }
    this._endGameCallback = endGameCallback;
    
    GameInstance.Mouse.setTimestamp();
    
    var map = this;
    
    Map.prototype.INACTIVITY_INTERVAL = setInterval(function() {
        var t = GameInstance.Mouse.getLastTimestamp();
        var now = new Date().getTime();
        var diff = now - t;
        
        if (diff > Map.prototype.INACTIVITY_MS_TIME) {
            map.resetGame();
        } else if(diff > Map.prototype.INACTIVITY_MS_WARNING_TIME) {
            var currentTime = Math.max((Map.prototype.INACTIVITY_MS_TIME - diff) / 1000, 0).toFixed(1);
            GameInstance.idleText.setText(currentTime);
            GameInstance.idleText.visible = true;
        } else {
            GameInstance.idleText.visible = false;
        }
        
    }, 200);
    
	GameInstance.timerText.start();
	GameInstance.timerText.visible = true;
	
    GameInstance.redrawBackgroundLayer();
};

Map.prototype.getPieceTarget = function getPieceTarget(pieceName) {
    return Map.prototype.COORDS[this.key][pieceName];
};

Map.prototype.incrPiece = function (pieceName) {
    if (!this.pieceTable[pieceName]) {
        this.pieceTable[pieceName] = true;
        this.pieceCounter++;
    }
};

Map.prototype.checkEndGame = function checkEndGame() {
    if (this.pieceCounter === Map.prototype.NUM_PIECES) {
		GameInstance.timerText.stop();
        this._endGameCallback();
    }
};

Map.prototype.getName = function getName() {
    return Map.prototype.NAMES[this.key];
};

Map.prototype.resetGame = function resetGame() {
    window.clearInterval(Map.prototype.INACTIVITY_INTERVAL);
    Map.prototype.INACTIVITY_INTERVAL = null;
    GameInstance.resetGame(this);
};