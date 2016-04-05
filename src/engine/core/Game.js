var GameON = (function () {

	function Game(ops) {
		ops = ops || {};
		Element.apply(this, arguments);

		this.Canvas = new CanvasInterfaceImpl();

		this.Camera = new Camera();

		this.Camera.w = this.Canvas.w;
		this.Camera.h = this.Canvas.h;

		this.Mouse = new Mouse(this.Canvas.mainCanvas, this.Camera, this._children);
		this.add(this.Mouse.CollisionLine);

		this._debug = ops.debug || false;
	}

	Game.prototype = Object.create(Element.prototype);

	Game.prototype.draw = function () {

		this.x = this.Camera.w / 2;
		this.y = this.Camera.h / 2;

		return true;
	};

	Game.prototype.start = function () {

		function animate() {
			GameON.Canvas.clear();
			GameON.drawElement(GameON);			
			requestAnimationFrame(animate);
		}

		animate();
	};

	Game.prototype.drawElement = function (element) {
		if (element.draw(this.Canvas.ctx)) {
			this.Canvas.setElementPosition(element, this.Camera);

			// should check if it is on camera's frame
			this.Canvas.drawByType(element);

			if (this._debug) {
				this.Canvas.drawBoundingRect(element._ndc);
			}

			this.Canvas.restoreElementPosition();

			this.drawElementCollection(element._children);
		}
	};

	Game.prototype.drawElementCollection = function (elementCollection) {
		for (var key in elementCollection) {
			var zElements = elementCollection[key];
			for (var i = 0; i < zElements.length; i++) {
				if (zElements[i].visible) {
					this.drawElement(zElements[i]);
				}
			}
		}
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