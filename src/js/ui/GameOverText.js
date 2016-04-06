function GameOverText(ops) {
    ops = ops || {};
    DisplayText.apply(this, arguments);

    if (!(ops.map instanceof Map)) {
        throw "GameOverText not initialized without a map reference";
    }

    var gameOverTopText = new DisplayText({
        txt: "VOCÊ COMPLETOU: " + ops.map.getName().toLocaleUpperCase()
    });

    var gameOverBottomText = new DisplayText({
        txt: "OBRIGADO POR JOGAR!"
    });

    this.add(gameOverTopText);

    gameOverTopText.setSize(this.TEXT_SIZE);
    gameOverTopText.setPosition(0, this.POSITION_Y);

    this.add(gameOverBottomText);

    gameOverBottomText.setSize(this.TEXT_SIZE);
    gameOverBottomText.setPosition(0, -this.POSITION_Y);
    
    this.top = gameOverTopText;
    this.bottom = gameOverBottomText;
    
    this.z = 1000;
}

GameOverText.prototype = Object.create(DisplayText.prototype);

GameOverText.prototype.TEXT_SIZE = 5;
GameOverText.prototype.POSITION_Y = 45;