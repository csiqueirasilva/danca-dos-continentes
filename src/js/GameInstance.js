function GameInstance(ops) {
    ops = ops || {};

    ops.debug = false;

    ops.nLayers = 4;

    Game.apply(this, [ops]);

    this.BackgroundImageLayer = this._layers[0];
    this.BackgroundLayer = this._layers[1];
    this.PieceLayer = this._layers[2];
    this.UILayer = this._layers[3];

    this.GAME_WIDTH = 800;
    this.GAME_HEIGHT = 450;

    var backgroundScaleW = this.Camera.w / 800;
    var backgroundScaleH = this.Camera.h / 450;

    this.BackgroundImageLayer.autoUpdate = true;
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

    var squareClickRefs = Map.prototype.MAIN_MENU_REF;

    for (var key in squareClickRefs) {

        var clickRef = squareClickRefs[key];

        var link = new ClickableSquare({
            w: clickRef.w * this.Camera.w,
            h: clickRef.h * this.Camera.h,
            a: 0
        });

        link.setPosition(
                clickRef.x,
                clickRef.y
                );

        link._key = key;

        link.z = 100;

        link.clickCallback = function () {
            var key = this._key;

            var map = maps[key];

            var sortedPieces = pieces.slice(0);

            while(sortedPieces.length > 0) {
                var piece = sortedPieces.splice((sortedPieces.length - 1) * Math.random(), 1)[0];
                piece.initForGameplay(map);
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
                    bg.resetGame();
                }, 5000);
            });

            pieceWrapper.visible = true;
            mainMenuWrapper.visible = false;
        };

        mainMenuWrapper.add(link);
    }

    var totalFixedBackgroundAssets = 2;

    // add main background image
    var backgroundImage = new SquareImage({
        imgPath: 'imgs/ui/fundo-danca-textura.jpg'
    });

    this.BackgroundImageLayer._assetsLoaded = 0;

    function BackgroundImageLayerLoadCallback() {
        if (!this._drawn) {
            if (++GameInstance.BackgroundImageLayer._assetsLoaded === totalFixedBackgroundAssets) {
                GameInstance.BackgroundImageLayer.autoUpdate = false;
            }
            this._drawn = true;
        }
    }

    backgroundImage.afterDraw = BackgroundImageLayerLoadCallback;

    this.BackgroundImageLayer.add(backgroundImage);

    backgroundImage.scaleW = backgroundScaleW;
    backgroundImage.scaleH = backgroundScaleH;

    // add main background image
    var gameLogoImage = new SquareImage({
        imgPath: 'imgs/ui/titulo-danca-continentes.png'
    });

    gameLogoImage.setPosition(0, 44.5);

    gameLogoImage.afterDraw = BackgroundImageLayerLoadCallback;

    this.BackgroundImageLayer.add(gameLogoImage);

    gameLogoImage.scaleW = backgroundScaleW;
    gameLogoImage.scaleH = backgroundScaleH;

    var menuImage = new SquareImage({
        imgPath: 'imgs/ui/menu-tela-inicial.png'
    });

    menuImage.scaleW = backgroundScaleW;
    menuImage.scaleH = backgroundScaleH;

    mainMenuWrapper.add(menuImage);

    this.resetGame = function (bg) {
        bg.visible = false;
        pieceWrapper.visible = false;
        mainMenuWrapper.visible = true;
        this.idleText.visible = false;
        this.timerText.visible = false;
        
        GameInstance.redrawBackgroundLayer();
    };

	this.timerText = new TimerText();
	this.timerText.visible = false;
	GameInstance.addToUILayer(this.timerText);
	
    this.idleText = new ReturnToMainMenuText();
    this.idleText.visible = false;
    GameInstance.addToUILayer(this.idleText);

    if (this._debug) {
        window.printPieceTarget = function printPieceTarget() {
            var target = {};
            for (var i = 0; i < pieces.length; i++) {
                var p = pieces[i];
                target[p.name] = {};
                target[p.name].x = p.x / GameInstance.Camera.w;
                target[p.name].y = p.y / GameInstance.Camera.h;
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
        this._startDelay = 800;
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
    this.BackgroundLayer.drawElement(this.BackgroundLayer);
};