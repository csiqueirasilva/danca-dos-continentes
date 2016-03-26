var GameON = (function () {

	var DEBUG_MODE = true;

	function Game(ops) {
		ops = ops || {};
		Element.apply(this, arguments);

		this.Canvas = new CanvasInterfaceImpl();

		this.Camera = new Camera();

		this.Camera.w = this.Canvas.w;
		this.Camera.h = this.Canvas.h;

		this.Mouse = new Mouse(this.Canvas.mainCanvas, this.Camera, this._children);
		this.add(this.Mouse.CollisionLine);

		this.DEBUG_MODE = DEBUG_MODE;
	}

	Game.prototype = Object.create(Element.prototype);

	Game.prototype.start = function () {

		function animate() {
			requestAnimationFrame(animate);
			GameON.Canvas.clear();
			GameON.drawElementCollection(GameON._children);
		}

		animate();
	};

	Game.prototype.drawElementCollection = function (elementCollection) {
		for (var key in elementCollection) {
			var zElements = elementCollection[key];
			for (var i = 0; i < zElements.length; i++) {
				if (zElements[i].visible && this.Camera.onFrame(zElements[i])) {
					zElements[i].draw();
					this.drawElementCollection(zElements[i]._children);
				}
			}
		}
	};

	Game.prototype.getNDC = function (element) {
		var ndcPos = this.Camera.getNDCPos(element.x, element.y);
		ndcPos.x *= this.Canvas.w;
		ndcPos.y *= this.Canvas.h;
		var ndcSize = this.Camera.getNDCSize(element.w, element.h);
		ndcSize.x *= this.Canvas.w * element.scaleW;
		ndcSize.y *= this.Canvas.h * element.scaleH;

		ndcPos.x -= ndcSize.x / 2;
		ndcPos.y -= ndcSize.y / 2;

		return {
			pos: ndcPos,
			size: ndcSize
		};
	};

	var GameInstance = new Game();

	var resizeInterval = window.setInterval(function () {
		if (GameInstance.Canvas.w !== window.innerWidth || GameInstance.Canvas.h !== window.innerHeight) {
			GameInstance.Camera.w = GameInstance.Canvas.w = GameInstance.Canvas.mainCanvas.width = window.innerWidth;
			GameInstance.Camera.h = GameInstance.Canvas.h = GameInstance.Canvas.mainCanvas.height = window.innerHeight;
		}
	}, 300);

	return GameInstance;

})();