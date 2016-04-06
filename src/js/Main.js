setTimeout(function () {

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
				this.visible = false;
				pieceWrapper.visible = false;
				mainMenuWrapper.visible = true;
			});

			pieceWrapper.visible = true;
			mainMenuWrapper.visible = false;
		};

		mainMenuWrapper.add(link);
	}

	GameON._debug = true;

	GameON.start();

}, 100);