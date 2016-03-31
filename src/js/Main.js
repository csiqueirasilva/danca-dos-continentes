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

var pieceWrapper = new Element();
pieceWrapper.visible = false;
pieceWrapper.z = 10;

var gameWrapper = new Element();
gameWrapper.add(pieceWrapper);

GameON.add(gameWrapper);

var scale = (GameON.Camera.w * 0.9) / 457;

for(var i = 0; i < pieceNames.length; i++) {
	var square = new Piece({
		imgPath: 'imgs/futuro/pecas-futuro/' + pieceNames[i] + '.png'
	});
	
	square.x = (Math.random() * 0.8 - 0.4) * GameON.Camera.w;
	square.y = (Math.random() * 0.8 - 0.4) * GameON.Camera.h;

	square.setScale(scale);
	
	square.rotation = Piece.prototype.rotationAngle * parseInt(Math.random() * 100);
	
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

for(var key in mapNames) {
	var link = new ClickableText({
		txt: mapNames[key]
	});

	link.setSize(mapOptionSize);

	link.setPosition(0, mapOptionStart + idx * -mapOptionSize);
	
	idx += 1.5;
	
	link.clickCallback = function () {
		pieceWrapper.visible = true;
		mainMenuWrapper.visible = false;
		
		var bg = new SquareImage({
			imgPath: 'imgs/futuro/' + 'globo-com-fundo' + '.png'
		});
		
		bg.setScale(scale);
		
		bg.z = 0;
		
		gameWrapper.add(bg);
	};
	
	mainMenuWrapper.add(link);
}

GameON._debug = true;

GameON.start();
