var GameON = (function() {
	
	// setting body style
	document.body.style.width = '100%';
	document.body.style.height = '100%';
	document.body.style.padding = '0';
	document.body.style.margin = '0';
	
	var mainCanvas = document.createElement('canvas');
	
	var ctx = mainCanvas.getContext('2d');
	
	var w = mainCanvas.width = window.innerWidth;
	var h = mainCanvas.height = window.innerHeight;

	var resizeInterval = window.setInterval(function() {
		if(w !== window.innerWidth || h !== window.innerHeight) {
			w = mainCanvas.width = window.innerWidth;
			h = mainCanvas.height = window.innerHeight;
		}
	}, 300);

	var elements = [];

	var camera = new Camera();

	function drawAllElements() {
		ctx.clearRect(0, 0, w, h);
		
		for(var i = 0; i < elements.length; i++) {
			if(elements[i].visible && camera.onFrame(elements[i])) {
				var ndcPos = camera.getNDCPos(elements[i].x, elements[i].y);
				ndcPos.x *= w;
				ndcPos.y *= h;
				var ndcSize = camera.getNDCSize(elements[i].w, elements[i].h);
				ndcSize.x *= w;
				ndcSize.y *= h;
				
				ndcPos.x -= ndcSize.x / 2;
				ndcPos.y -= ndcSize.y / 2;

				elements[i].draw(ctx, ndcPos, ndcSize);
			}
		}
	}

	function animate() {
		requestAnimationFrame(animate);
		drawAllElements();
    }

	document.body.appendChild(mainCanvas);
	
	function add(element) {
		if(element instanceof Element) {
			elements.push(element);
		}
	}
	
	return {
		add: add,
		start: animate
	};
	
})();
