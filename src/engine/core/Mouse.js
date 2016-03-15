function Mouse(canvas, camera, elements) {
	
	/* Mouse click */
	var CurrentMousePosition = {
		x: 0,
		y: 0
	};
	
	var LastMousePosition = {
		x:0, 
		y:0
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

		mouseX += camera.x + mouseX * camera.w;
		mouseY += camera.y + mouseY * camera.h;
		
		CurrentMousePosition.x = mouseX;
		CurrentMousePosition.y = mouseY;
		
		var topElement = null;

		for (var i = 0; i < elements.length; i++) {
			if (elements[i].mouseInteract) {
				if (elements[i].visible && camera.onFrame(elements[i])) {
					var corners = elements[i].getCorners();
					if (mouseX <= corners[0].x && mouseX >= corners[1].x && mouseY <= corners[0].y && mouseY >= corners[2].y) {
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
	
	function drag(element) {
		if(MouseDown) {
			document.body.style.cursor = 'move';
			element.x += CurrentMousePosition.x - LastMousePosition.x;
			element.y += CurrentMousePosition.y - LastMousePosition.y;
		} else {
			document.body.style.cursor = 'default';
		}
	}
	
	return {
		dragElement: drag
	};
}