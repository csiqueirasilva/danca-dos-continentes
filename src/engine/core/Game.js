var GameON = (function () {

	// setting body style
	document.body.style.width = '100%';
	document.body.style.height = '100%';
	document.body.style.padding = '0';
	document.body.style.margin = '0';

	var mainCanvas = document.createElement('canvas');

	var ctx = mainCanvas.getContext('2d');

	var w = mainCanvas.width = window.innerWidth;
	var h = mainCanvas.height = window.innerHeight;

	var resizeInterval = window.setInterval(function () {
		if (w !== window.innerWidth || h !== window.innerHeight) {
			w = mainCanvas.width = window.innerWidth;
			h = mainCanvas.height = window.innerHeight;
		}
	}, 300);

	var elements = [];

	var camera = new Camera();

	function getNDC(element) {
		var ndcPos = camera.getNDCPos(element.x, element.y);
		ndcPos.x *= w;
		ndcPos.y *= h;
		var ndcSize = camera.getNDCSize(element.w, element.h);
		ndcSize.x *= w * element.scaleW;
		ndcSize.y *= h * element.scaleH;

		ndcPos.x -= ndcSize.x / 2;
		ndcPos.y -= ndcSize.y / 2;

		return {
			pos: ndcPos,
			size: ndcSize
		};
	}

	function setElementPosition(ndc, rotation) {
		ctx.save();
		ctx.translate(ndc.pos.x + ndc.size.x / 2, ndc.pos.y + ndc.size.y / 2);
		ctx.rotate(rotation);
	}

	function drawRect(element) {
		var ndc = getNDC(element);

		setElementPosition(ndc, element.rotation);
		
		ctx.fillStyle = 'rgb(' + element.color.r + ', ' + element.color.g + ', ' + element.color.b + ')';
		ctx.rect(ndc.pos.x, ndc.pos.y, ndc.size.x, ndc.size.y);
		ctx.fill();
		
		ctx.restore();
	}

	function drawImage(element) {
		var ndc = getNDC(element);

		setElementPosition(ndc, element.rotation);

		ctx.drawImage(element.img, -ndc.size.x / 2, -ndc.size.y / 2, ndc.size.x, ndc.size.y);

		ctx.restore();
	}


	function drawAllElements() {
		ctx.clearRect(0, 0, w, h);

		for (var i = 0; i < elements.length; i++) {
			if (elements[i].visible && camera.onFrame(elements[i])) {
				elements[i].draw();
			}
		}
	}

	function animate() {
		requestAnimationFrame(animate);
		drawAllElements();
	}

	document.body.appendChild(mainCanvas);

	function add(element) {
		if (element instanceof Element) {
			elements.push(element);
		}
	}

	return {
		/* Methods */
		add: add,
		start: animate,
		getNDC: getNDC,
		drawImage: drawImage,
		drawRect: drawRect,
		
		/* Components */
		Mouse: new Mouse(mainCanvas, camera, elements)
	};

})();
