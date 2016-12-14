function TimerText(ops) {
    ops = ops || {};
    DisplayText.apply(this, arguments);

    this.displayText = new DisplayText({
        txt: "",
        r: 255,
        g: 255,
        b: 255
    });

    this.add(this.displayText);

	function formatMillis(t) {
		var totalSecs = parseInt(t / 1000);
		var min = parseInt(totalSecs / 60);
		var sec = totalSecs - min * 60;
		return (min <= 9 ? "0" + min : min) + ":" + (sec <= 9 ? "0" + sec : sec);
	}
	
	var timerInst = this;
	
    this.displayText.getText = function () {
        return timerInst.totalT !== null ? formatMillis(timerInst.totalT) : formatMillis(new Date().getTime() - timerInst.startT);
    };

    this.displayText.setSize(this.TEXT_SIZE);
    this.displayText.setPosition(TimerText.prototype.POSITION_X, this.POSITION_Y);
    
    this.bottom = this.displayText;
    
    this.z = 1100;
}

TimerText.prototype = Object.create(DisplayText.prototype);

TimerText.prototype.stop = function(t) {
    this.totalT = new Date().getTime() - this.startT;
};

TimerText.prototype.start = function start() {
	this.totalT = null;
	this.startT = new Date().getTime();
	this.txt = "";
};

TimerText.prototype.TEXT_SIZE = 5;
TimerText.prototype.POSITION_Y = 45;
TimerText.prototype.POSITION_X = 42.5;