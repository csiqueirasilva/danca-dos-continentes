function ReturnToMainMenuText(ops) {
    ops = ops || {};
    DisplayText.apply(this, arguments);

    this.displayText = new DisplayText({
        txt: "",
        r: 255,
        g: 255,
        b: 255
    });

    this.add(this.displayText);

    this.displayText.getText = function () {
        return "VOLTANDO A TELA INICIAL EM " + this.txt + " SEGUNDOS (MOVA O MOUSE PARA CANCELAR)";
    };

    this.displayText.setSize(this.TEXT_SIZE);
    this.displayText.setPosition(0, -this.POSITION_Y);
    
    this.bottom = this.displayText;
    
    this.z = 1000;
}

ReturnToMainMenuText.prototype = Object.create(DisplayText.prototype);

ReturnToMainMenuText.prototype.setText = function(t) {
    this.displayText.txt = t;
};

ReturnToMainMenuText.prototype.TEXT_SIZE = 3.5;
ReturnToMainMenuText.prototype.POSITION_Y = 45;