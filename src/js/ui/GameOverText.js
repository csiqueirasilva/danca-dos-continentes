function GameOverText(ops) {
    ops = ops || {};
    DisplayText.apply(this, arguments);

    if (!(ops.map instanceof Map)) {
        throw "GameOverText not initialized without a map reference";
    }

    var gameOverBottomText = new DisplayText({
        txt: "VOCÊ COMPLETOU: " + ops.map.getName().toLocaleUpperCase() + " - OBRIGADO POR JOGAR!",
        r: 255,
        g: 255,
        b: 255
    });

    this.add(gameOverBottomText);

    gameOverBottomText.setSize(this.TEXT_SIZE);
    gameOverBottomText.setPosition(0, -this.POSITION_Y);
    
    this.bottom = gameOverBottomText;
    
    this.z = 1000;
}

GameOverText.prototype = Object.create(DisplayText.prototype);

GameOverText.prototype.TEXT_SIZE = 5;
GameOverText.prototype.POSITION_Y = 45;