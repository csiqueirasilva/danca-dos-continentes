var pieces = [
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

for(var i = 0; i < pieces.length; i++) {
	var square = new Piece({
		imgPath: 'imgs/futuro/pecas-futuro/' + pieces[i] + '.png'
	});
	
	square.x = (Math.random() * 0.8 - 0.4) * GameON.Camera.w;
	square.y = (Math.random() * 0.8 - 0.4) * GameON.Camera.h;

	square.setScale(2.5);
	
	square.rotation = (Math.PI * 2) * Math.random();
	
	GameON.add(square);
}

GameON.start();
