var square = new SquareImage({
	imgPath: 'imgs/futuro/pecas-futuro/AFR1.png'
});

square.x = 0;
square.y = 0;

square.setScale(2.5);

square.rotation = (Math.PI * 2) * Math.random();

GameON.add(square);

GameON.start();

setInterval(function() {
	//square.rotation += 0.01;
}, 50);