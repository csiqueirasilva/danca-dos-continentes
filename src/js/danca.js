var square = new SquareImage({
	imgPath: 'imgs/futuro/pecas-futuro/AFR1.png'
});

square.x = 30;
square.y = 0;

square.setScale(1.2);

//square.rotation = Math.PI;

GameON.add(square);

GameON.start();

setInterval(function() {
	//square.rotation += 0.01;
}, 50);