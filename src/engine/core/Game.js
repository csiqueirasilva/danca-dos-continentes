var GameON = (function () {

	var DEBUG_MODE = true;

	// setting body style
	document.body.style.width = '100%';
	document.body.style.height = '100%';
	document.body.style.padding = '0';
	document.body.style.margin = '0';

	var mainCanvas = document.createElement('canvas');

	var ctx = mainCanvas.getContext('2d');

	var w = mainCanvas.width = window.innerWidth;
	var h = mainCanvas.height = window.innerHeight;

	var camera = new Camera();

	camera.w = w;
	camera.h = h;

	var resizeInterval = window.setInterval(function () {
		if (w !== window.innerWidth || h !== window.innerHeight) {
			w = mainCanvas.width = window.innerWidth;
			h = mainCanvas.height = window.innerHeight;
			camera.w = w;
			camera.h = h;
		}
	}, 300);

	var elements = [];

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

		if (DEBUG_MODE) {
			ctx.strokeStyle = '#FFFFFF';
			ctx.beginPath();
			ctx.rect(-ndc.size.x / 2, -ndc.size.y / 2, ndc.size.x, ndc.size.y);
			ctx.stroke();
			ctx.closePath();
		}

		ctx.restore();
	}

	function drawLine(element) {

		var ndc = getNDC(element);

		setElementPosition(ndc, element.rotation);

		var sx = (element.sx / camera.w) * w;
		var sy = -(element.sy / camera.h) * h;

		var ex = (element.ex / camera.w) * w;
		var ey = -(element.ey / camera.h) * h;

		ctx.strokeStyle = 'rgb(' + element.color.r + ', ' + element.color.g + ', ' + element.color.b + ')';
		ctx.beginPath();
		ctx.moveTo(sx, sy);
		ctx.lineTo(ex, ey);
		ctx.stroke();
		ctx.closePath();

		ctx.restore();
	}

	function drawAllElements() {
		ctx.clearRect(0, 0, w, h);

		for (var j = 0; j < elements.length; j++) {
			var zElements = elements[j];
			for (var i = 0; i < zElements.length; i++) {
				if (zElements[i].visible && camera.onFrame(zElements[i])) {
					zElements[i].draw();
				}
			}
		}
	}

	function animate() {
		requestAnimationFrame(animate);
		drawAllElements();
	}

	document.body.appendChild(mainCanvas);

	function remove(element) {
		var added = onScene(element);
		if (added) {
			var idx = elements[element.z].indexOf(element);
			elements[element.z].splice(idx, 1);
		}
		return added;
	}

	function add(element) {
		if (element instanceof Element) {
			if (!(elements[element.z] instanceof Array)) {
				elements[element.z] = [];
			}
			elements[element.z].push(element);
		}
	}

	function onScene(element) {
		return element instanceof Element && elements[element.z] instanceof Array && elements[element.z].indexOf(element) !== -1;
	}

	function moveRenderOrder(element, z) {
		var added = onScene(element);
		if(added) {
			remove(element);
			element.z = z;
			add(element);
		}
		return added;
	}

	var mouse = new Mouse(mainCanvas, camera, elements);
	add(mouse.CollisionLine);

	return {
		/* Methods */
		add: add,
		remove: remove,
		start: animate,
		getNDC: getNDC,
		drawImage: drawImage,
		drawRect: drawRect,
		drawLine: drawLine,
		onScene: onScene,
		moveRenderOrder: moveRenderOrder,
		/* Components */
		Mouse: mouse,
		Camera: camera
	};

})();
