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
GameON.add(pieceWrapper);

for(var i = 0; i < pieceNames.length; i++) {
	var square = new Piece({
		imgPath: 'imgs/futuro/pecas-futuro/' + pieceNames[i] + '.png'
	});
	
	square.x = (Math.random() * 0.8 - 0.4) * GameON.Camera.w;
	square.y = (Math.random() * 0.8 - 0.4) * GameON.Camera.h;

	square.setScale(2.5);
	
	square.rotation = (Math.PI * 2) * Math.random();
	
	pieceWrapper.add(square);
}

var mainTitle = new DisplayText({
	txt: "Dança dos Continentes"
});

mainTitle.setSize(5);

mainTitle.setPosition(0, 42.5);

GameON.add(mainTitle);

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
		
	};
	
	GameON.add(link);
}

GameON.start();
