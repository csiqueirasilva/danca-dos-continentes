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

var pieces = [];

for(var i = 0; i < pieceNames.length; i++) {
	var square = new Piece({
		imgPath: 'imgs/futuro/pecas-futuro/' + pieceNames[i] + '.png'
	});
	
	square.x = (Math.random() * 0.8 - 0.4) * GameON.Camera.w;
	square.y = (Math.random() * 0.8 - 0.4) * GameON.Camera.h;

	square.setScale(2.5);
	
	square.rotation = (Math.PI * 2) * Math.random();

	square.visible = false;
	
	pieces.push(square);
	
	//GameON.add(square);
}

var mainTitle = new ClickableText({
	txt: "Dança dos Continentes"
});

mainTitle.setSize(5);

mainTitle.setPosition(0, 42.5);

GameON.add(mainTitle);

GameON.start();
