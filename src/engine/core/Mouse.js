function Mouse(canvas, camera, elements) {

	/* Mouse click */
	var CurrentMousePosition = {
		x: 0,
		y: 0
	};

	var LastMousePosition = {
		x: 0,
		y: 0
	};

	var MouseDown = false;

	canvas.addEventListener('mousedown', function (e) {
		MouseDown = true;
	});

	canvas.addEventListener('mouseup', function (e) {
		MouseDown = false;
	});

	/* Mouse over */
	var LastTopElement = null;
	
	var CollisionLine = new Line();

	canvas.addEventListener('mousemove', function (e) {
		var mouseX = e.clientX / window.innerWidth - 0.5;
		var mouseY = 0.5 - e.clientY / window.innerHeight;

		mouseX = camera.x + mouseX * camera.w;
		mouseY = camera.y + mouseY * camera.h;

		//console.log(mouseX, mouseY);

		var sx = camera.x - camera.w * 100;
		var sy = camera.y + mouseY;
			
		var rot = 0.2;
		
		CollisionLine.sy = sx * Math.sin(rot) + sy * Math.cos(rot);
		CollisionLine.sx = sx * Math.cos(rot) - sy * Math.sin(rot);
			
		CollisionLine.ex = camera.x + mouseX;
		CollisionLine.ey = camera.y + mouseY;

		CurrentMousePosition.x = mouseX;
		CurrentMousePosition.y = mouseY;

		var topElement = null;

		for (var i = 0; i < elements.length; i++) {
			if (elements[i].mouseInteract) {
				if (elements[i].visible && camera.onFrame(elements[i])) {
					if(elements[i].isPointInside(mouseX, mouseY)) {
						topElement = elements[i];
					}
				}
			}
		}

		if (topElement && topElement.mouseMove instanceof Function) {
			topElement.mouseMove(mouseX, mouseY);
		}

		if (topElement !== LastTopElement) {
			if (LastTopElement !== null && LastTopElement.mouseOut instanceof Function) {
				LastTopElement.mouseOut();
				mouseUp();
			}

			LastTopElement = topElement;

			if (LastTopElement !== null && LastTopElement.mouseOver instanceof Function) {
				LastTopElement.mouseOver();
			}
		}

		LastMousePosition.x = CurrentMousePosition.x;
		LastMousePosition.y = CurrentMousePosition.y;
	});

	// methods

	function mouseDown(element) {
		document.body.style.cursor = 'move';
		element.x += CurrentMousePosition.x - LastMousePosition.x;
		element.y += CurrentMousePosition.y - LastMousePosition.y;
	}

	function mouseUp(element) {
		document.body.style.cursor = 'default';
		MouseDown = false;
	}

	function drag(element) {
		if (MouseDown) {
			mouseDown(element);
		} else {
			mouseUp(element);
		}
	}

	return {
		dragElement: drag,
		CollisionLine: CollisionLine
	};
}