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

Map.prototype.NAMES = {
    'futuro': 'Futuro',
    'atual': 'Atual',
    'pangeia': 'Pangeia',
    'rodinia': 'Rodínia'
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
    this.visible = true;
    this.pieceCounter = 0;
    this.pieceTable = {};
    if (!(endGameCallback instanceof Function)) {
        throw "Undefined end game callback";
    }
    this._endGameCallback = endGameCallback;
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
        this._endGameCallback();
    }
};