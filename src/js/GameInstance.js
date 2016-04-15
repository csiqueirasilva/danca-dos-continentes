function GameInstance(ops) {
    ops = ops || {};

    ops.debug = false;
    
    ops.nLayers = 3;

    Game.apply(this, [ops]);

    this.BackgroundLayer = this._layers[0];
    this.PieceLayer = this._layers[1];
    this.UILayer = this._layers[2];

    this.BackgroundLayer.autoUpdate = false;
    this.PieceLayer.autoUpdate = true;
    this.UILayer.autoUpdate = true;

    var pieceNames = Piece.prototype.NAMES;

    var mapNames = Map.prototype.NAMES;

    var maps = {};
    var pieces = [];

    var pieceWrapper = new Element();
    pieceWrapper.visible = false;
    pieceWrapper.z = 10;

    var backgroundWrapper = new Element();

    this.addToPieceLayer(pieceWrapper);
    this.addToBackgroundLayer(backgroundWrapper);

    var scale = (this.Camera.w * 0.9) / 457;

    for (var key in mapNames) {
        var map = new Map({
            imgPath: 'imgs/' + key + '/globo-com-fundo.png',
            key: key
        });

        maps[key] = map;
        backgroundWrapper.add(map);
        map.setScale(scale);
        map.z = 0;
    }

    for (var i = 0; i < pieceNames.length; i++) {
        var square = new Piece({
            defaultImgPath: 'imgs/pecas/' + pieceNames[i] + '.png',
            snappedImgPath: 'imgs/pecas/hover-' + pieceNames[i] + '.png'
        });

        square.name = pieceNames[i];

        square.setScale(scale);

        pieces.push(square);
        pieceWrapper.add(square);
    }

    var mainMenuWrapper = new Element();
    this.addToUILayer(mainMenuWrapper);

    var mainTitle = new DisplayText({
        txt: "Dança dos Continentes"
    });

    mainTitle.setSize(5);

    mainTitle.setPosition(0, 42.5);

    mainMenuWrapper.add(mainTitle);

    var idx = 0;
    var mapOptionStart = 20;
    var mapOptionSize = 5;

    for (var key in mapNames) {
        var link = new ClickableText({
            txt: mapNames[key]
        });

        link._key = key;

        link.setSize(mapOptionSize);

        link.setPosition(0, mapOptionStart + idx * -mapOptionSize);

        idx += 1.5;

        link.clickCallback = function () {
            var key = this._key;

            var map = maps[key];

            for (var i = pieces.length - 1; i >= 0; i--) {
                pieces[i].initForGameplay(map);
            }

            map.initForGameplay(function endGameCallback() {

                var bg = this;

                var gameOverText = new GameOverText({
                    map: bg
                });

                GameInstance.addToUILayer(gameOverText);

                setTimeout(function () {
                    GameInstance.removeFromUILayer(gameOverText);
                    delete gameOverText;

                    bg.visible = false;
                    pieceWrapper.visible = false;
                    mainMenuWrapper.visible = true;

                    GameInstance.redrawBackgroundLayer();
                }, 5000);
            });

            pieceWrapper.visible = true;
            mainMenuWrapper.visible = false;
        };

        mainMenuWrapper.add(link);
    }

    if (this._debug) {
        window.printPieceTarget = function printPieceTarget() {
            var target = {};
            for (var i = 0; i < pieces.length; i++) {
                var p = pieces[i];
                target[p.name] = {};
                target[p.name].x = p.x / this.Canvas.w;
                target[p.name].y = p.y / this.Canvas.h;
                var rot = (p.rotation % (Math.PI * 2)) / (Math.PI * 2)
                if (rot < 0) {
                    rot += 1;
                }
                target[p.name].rot = rot;
            }
            console.log(JSON.stringify(target));
        };

        window.snapAll = function snapAll() {
            for (var i = 0; i < pieces.length; i++) {
                var p = pieces[i];
                p.toSnapPosition();
            }
        };

        window.snapPositionById = function snapPositionById(id) {
            var p = null;

            for (var i = 0; i < pieces.length && p === null; i++) {
                if (pieces[i].name === id) {
                    p = pieces[i];
                }
            }

            if (p !== null) {
                p.toSnapPosition();
            }
        };

        window.pieces = pieces;
        this._startDelay = 1;
    } else {
        this._startDelay = 300;
    }
}

GameInstance.prototype = Object.create(Game.prototype);

GameInstance.prototype.addToUILayer = function (element) {
    this.UILayer.add(element);
};

GameInstance.prototype.addToPieceLayer = function (element) {
    this.PieceLayer.add(element);
};

GameInstance.prototype.addToBackgroundLayer = function (element) {
    this.BackgroundLayer.add(element);
};

GameInstance.prototype.removeFromUILayer = function (element) {
    this.UILayer.remove(element);
};

GameInstance.prototype.removeFromPieceLayer = function (element) {
    this.PieceLayer.remove(element);
};

GameInstance.prototype.removeFromBackgroundLayer = function (element) {
    this.BackgroundLayer.remove(element);
};

GameInstance.prototype.redrawBackgroundLayer = function (element) {
    this.BackgroundLayer.Canvas.clear();
    this.BackgroundLayer.drawElement(this._layers[0]);
};