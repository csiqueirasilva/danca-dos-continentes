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

	var LastTopElement = null;

	/* Mouse up and down */

	var MOUSE_BTN = {
		LEFT: 0,
		MIDDLE: 1,
		RIGHT: 2
	};

	var LeftMouseDown = false;
	var MiddleMouseDown = false;
	var RightMouseDown = false;

	canvas.addEventListener('wheel', function (e) {
		var direction = (e.detail < 0 || e.wheelDelta > 0) ? 1 : -1;

		if (LastTopElement && LastTopElement.mouseWheel instanceof Function) {
			LastTopElement.mouseWheel(CurrentMousePosition.x, CurrentMousePosition.y, direction, e);
		}
	});

	canvas.addEventListener('mousedown', function (e) {
		switch (e.button) {
			case MOUSE_BTN.LEFT:
				LeftMouseDown = true;
				break;
			case MOUSE_BTN.MIDDLE:
				MiddleMouseDown = true;
				break;
			case MOUSE_BTN.RIGHT:
				RightMouseDown = true;
		}

		if (LastTopElement && LastTopElement.mouseDown instanceof Function) {
			LastTopElement.mouseDown(CurrentMousePosition.x, CurrentMousePosition.y, e);
		}
	});

	canvas.addEventListener('mouseup', function (e) {
		switch (e.button) {
			case MOUSE_BTN.LEFT:
				LeftMouseDown = false;
				break;
			case MOUSE_BTN.MIDDLE:
				MiddleMouseDown = false;
				break;
			case MOUSE_BTN.RIGHT:
				RightMouseDown = false;
		}

		if (LastTopElement && LastTopElement.mouseUp instanceof Function) {
			LastTopElement.mouseUp(e);
		}
	});

	/* Mouse over */

	function checkTopElement(collection, mouseX, mouseY) {

		var topElement = null;

		for (var key in collection) {
			var zElements = collection[key];
			for (var i = 0; i < zElements.length; i++) {
				// needs to check if it is on camera's frame
				if (zElements[i].visible) {

					if (zElements[i].mouseInteract) {

						var isInsideElement = zElements[i].isPointInside(mouseX, mouseY);
						if (isInsideElement) {
							topElement = zElements[i];
						}
					}

					var childTopElement = checkTopElement(zElements[i]._children, mouseX, mouseY);

					if (childTopElement !== null) {
						topElement = childTopElement;
					}

				}
			}
		}

		return topElement;
	}

	canvas.addEventListener('mousemove', function (e) {
		var mouseX = e.clientX / window.innerWidth - 0.5;
		var mouseY = 0.5 - e.clientY / window.innerHeight;

		mouseX = camera.x + mouseX * camera.w;
		mouseY = camera.y + mouseY * camera.h;

		CurrentMousePosition.x = mouseX;
		CurrentMousePosition.y = mouseY;

		var topElement = checkTopElement(elements, mouseX, mouseY);

		if (topElement && topElement.mouseMove instanceof Function) {
			topElement.mouseMove(mouseX, mouseY);
		}

		if (topElement !== LastTopElement) {
			if (LastTopElement !== null && LastTopElement.mouseOut instanceof Function) {
				LastTopElement.mouseOut();
			}

			LastTopElement = topElement;

			if (LastTopElement !== null && LastTopElement.mouseOver instanceof Function) {
				LastTopElement.mouseOver();
			}
		}

	});

	// methods

	var eventInterval = setInterval(function () {

		if (LastTopElement !== null) {

			if (LastTopElement.draggable) {
				drag(LastTopElement);
			}

			if (LastTopElement.rotatable) {
				rotate(LastTopElement);
			}
		}

		LastMousePosition.x = CurrentMousePosition.x;
		LastMousePosition.y = CurrentMousePosition.y;

	}, 2);

	function dragMouseDown(element) {
		document.body.style.cursor = 'move';
		element.x += CurrentMousePosition.x - LastMousePosition.x;
		element.y += CurrentMousePosition.y - LastMousePosition.y;
	}

	function dragMouseUp(element) {
		document.body.style.cursor = 'default';
		LeftMouseDown = false;
	}

	function rotate(element) {
		var speed = element.rotateSpeed;

		if (RightMouseDown) {
			element.rotation += speed;
		} else if (MiddleMouseDown) {
			element.rotation += speed * -1;
		}
	}

	function drag(element) {
		if (LeftMouseDown) {
			dragMouseDown(element);
		} else {
			dragMouseUp(element);
		}
	}

	return {
		MOUSE_BTN: MOUSE_BTN
	};
}