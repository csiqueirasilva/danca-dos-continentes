function Map(ops) {
	ops = ops || {};
	SquareImage.apply(this, arguments);
	this.pieceCounter = 0;
	this.key = ops.key;
	this._endGameCallback = null;
	this.visible = false;
	this.pieceTable = {};
}

Map.prototype = Object.create(SquareImage.prototype);

Map.prototype.NUM_PIECES = Piece.prototype.NAMES.length;

Map.prototype.NAMES = {
	'futuro': 'Futuro',
	'atual': 'Atual',
	'pangeia': 'Pangeia',
	'rodinia': 'Rodínia'
};

Map.prototype.COORDS = {
	'futuro': {"NA": {"x": -0.18637977164272845, "y": 0.23117491532868106}, "China": {"x": 0.24571767250782575, "y": 0.1720885745888408}, "AFR1": {"x": 0.048207442490614504, "y": 0.19379390859972642}, "SA2": {"x": -0.27242512203256397, "y": -0.031930093609597324}, "AFR3": {"x": 0.11041210450597441, "y": -0.022775481677659543}, "AUS": {"x": 0.3175262690116946, "y": -0.03878383317294758}, "SA3": {"x": -0.30253377199357295, "y": -0.13245170133154127}, "EU": {"x": 0.18870568335829407, "y": 0.28331003006977035}, "SA1": {"x": -0.33057147457608227, "y": -0.029115428793955785}, "AFREU": {"x": 0.11763335147560428, "y": 0.27595204857035516}, "AFR2": {"x": 0.09164785483328294, "y": 0.06870061602719109}, "India": {"x": 0.21073831328812148, "y": 0.09104912288686198}, "Antartida": {"x": -0.08066113777938186, "y": -0.3146024665293112}},
	'atual': {},
	'pangeia': {},
	'rodinia': {}
};

Map.prototype.initForGameplay = function (endGameCallback) {
	this.visible = true;
	this.pieceCounter = 0;
	this.pieceTable = {};
	if (!(endGameCallback instanceof Function)) {
		throw "Undefined end game callback";
	}
	this._endGameCallback = endGameCallback;
};

Map.prototype.getPieceTarget = function getPieceTarget(pieceName) {
	return Map.prototype.COORDS[this.key][pieceName];
};

Map.prototype.incrPiece = function (pieceName) {
	if(!this.pieceTable[pieceName]) {
		this.pieceTable[pieceName] = true;
		this.pieceCounter++;
	}
};

Map.prototype.checkEndGame = function checkEndGame() {
	if(this.pieceCounter === Map.prototype.NUM_PIECES) {
		this._endGameCallback();
	}
};