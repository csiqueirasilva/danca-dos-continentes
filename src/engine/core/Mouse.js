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

	canvas.addEventListener('mousemove', function (e) {
		var mouseX = e.clientX / window.innerWidth - 0.5;
		var mouseY = 0.5 - e.clientY / window.innerHeight;

		mouseX = camera.x + mouseX * camera.w;
		mouseY = camera.y + mouseY * camera.h;

		CurrentMousePosition.x = mouseX;
		CurrentMousePosition.y = mouseY;

		var topElement = null;

		for (var j = 0; j < elements.length; j++) {
			var zElements = elements[j];
			for (var i = 0; i < zElements.length; i++) {
				if (zElements[i].mouseInteract) {
					if (zElements[i].visible && camera.onFrame(zElements[i])) {
						var isInsideElement = zElements[i].isPointInside(mouseX, mouseY);
						if (isInsideElement) {
							topElement = zElements[i];
						}
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
		dragElement: drag
	};
}