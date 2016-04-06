setTimeout(function () {

    GameON._debug = false;

    var pieceNames = Piece.prototype.NAMES;

    var mapNames = Map.prototype.NAMES;

    var maps = {};
    var pieces = [];

    var pieceWrapper = new Element();
    pieceWrapper.visible = false;
    pieceWrapper.z = 10;

    var gameWrapper = new Element();
    gameWrapper.add(pieceWrapper);

    GameON.add(gameWrapper);

    var scale = (GameON.Camera.w * 0.9) / 457;

    for (var key in mapNames) {
        var map = new Map({
            imgPath: 'imgs/' + key + '/globo-com-fundo.png',
            key: key
        });

        maps[key] = map;
        gameWrapper.add(map);
        map.setScale(scale);
        map.z = 0;
    }

    for (var i = 0; i < pieceNames.length; i++) {
        var square = new Piece({
            imgPath: 'imgs/pecas/' + pieceNames[i] + '.png'
        });

        square.name = pieceNames[i];

        square.setScale(scale);

        pieces.push(square);
        pieceWrapper.add(square);
    }

    var mainMenuWrapper = new Element();
    GameON.add(mainMenuWrapper);

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
                
                GameON.add(gameOverText);

                setTimeout(function () {
                    GameON.remove(gameOverText);
                    delete gameOverText;

                    bg.visible = false;
                    pieceWrapper.visible = false;
                    mainMenuWrapper.visible = true;
                }, 5000);
            });

            pieceWrapper.visible = true;
            mainMenuWrapper.visible = false;
        };

        mainMenuWrapper.add(link);
    }

    if (GameON._debug) {
        window.printPieceTarget = function printPieceTarget() {
            var target = {};
            for (var i = 0; i < pieces.length; i++) {
                var p = pieces[i];
                target[p.name] = {};
                target[p.name].x = p.x / GameON.Canvas.w;
                target[p.name].y = p.y / GameON.Canvas.h;
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
    }

    GameON.start();

}, 3000);
