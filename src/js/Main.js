setTimeout(function () {

	var pieceNames = [
		'AFR1',
		'AFR2',
		'AFR3',
		'AFREU',
		'Antartida',
		'AUS',
		'China',
		'EU',
		'India',
		'NA',
		'SA1',
		'SA2',
		'SA3'
	];

	var mapNames = {
		'futuro': 'Futuro',
		'atual': 'Atual',
		'pangeia': 'Pangeia',
		'rodinia': 'Rodínia'
	};

	var backgrounds = {};
	var pieces = [];

	var mapCoords = {
		'futuro': {"NA": {"x": -0.18637977164272845, "y": 0.23117491532868106}, "China": {"x": 0.24571767250782575, "y": 0.1720885745888408}, "AFR1": {"x": 0.048207442490614504, "y": 0.19379390859972642}, "SA2": {"x": -0.27242512203256397, "y": -0.031930093609597324}, "AFR3": {"x": 0.11041210450597441, "y": -0.022775481677659543}, "AUS": {"x": 0.3175262690116946, "y": -0.03878383317294758}, "SA3": {"x": -0.30253377199357295, "y": -0.13245170133154127}, "EU": {"x": 0.18870568335829407, "y": 0.28331003006977035}, "SA1": {"x": -0.33057147457608227, "y": -0.029115428793955785}, "AFREU": {"x": 0.11763335147560428, "y": 0.27595204857035516}, "AFR2": {"x": 0.09164785483328294, "y": 0.06870061602719109}, "India": {"x": 0.21073831328812148, "y": 0.09104912288686198}, "Antartida": {"x": -0.08066113777938186, "y": -0.3146024665293112}}
	};

	var pieceWrapper = new Element();
	pieceWrapper.visible = false;
	pieceWrapper.z = 10;

	var gameWrapper = new Element();
	gameWrapper.add(pieceWrapper);

	GameON.add(gameWrapper);

	var scale = (GameON.Camera.w * 0.9) / 457;

	for (var key in mapNames) {
		var bg = new SquareImage({
			imgPath: 'imgs/' + key + '/globo-com-fundo' + '.png'
		});

		bg.visible = false;
		backgrounds[key] = bg;
		gameWrapper.add(bg);
		bg.setScale(scale);
		bg.z = 0;
	}

	for (var i = 0; i < pieceNames.length; i++) {
		var square = new Piece({
			imgPath: 'imgs/pecas/' + pieceNames[i] + '.png'
		});

		square.name = pieceNames[i];

		square.x = (Math.random() * 0.8 - 0.4) * GameON.Camera.w;
		square.y = (Math.random() * 0.8 - 0.4) * GameON.Camera.h;

		square.setScale(scale);

		square.rotation = Piece.prototype.rotationAngle * parseInt(Math.random() * 100);

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

			for (var i = pieces.length - 1; i >= 0; i--) {
				pieces[i].target = mapCoords[key][pieces[i].name];
				pieces[i].target.x *= GameON.Canvas.w;
				pieces[i].target.y *= GameON.Canvas.h;
			}

			backgrounds[key].visible = true;
			pieceWrapper.visible = true;
			mainMenuWrapper.visible = false;
		};

		mainMenuWrapper.add(link);
	}

	GameON._debug = true;

	GameON.start();

}, 5000);