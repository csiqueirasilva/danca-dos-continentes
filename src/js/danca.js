var square = new SquareImage({
	x: 10,
	y: 10,
	imgPath: 'imgs/futuro/pecas-futuro/AFR1.png'
});

square.x = 30;
square.y = 30;

GameON.add(square);

GameON.start();