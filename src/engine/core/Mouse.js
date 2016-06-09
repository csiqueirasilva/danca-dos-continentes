function Mouse(canvas, camera, layers) {

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
    var DragElement = null;

    /* Mouse up and down */

    var MOUSE_BTN = {
        LEFT: 0,
        MIDDLE: 1,
        RIGHT: 2
    };

    var LeftMouseDown = false;
    var MiddleMouseDown = false;
    var RightMouseDown = false;

    /* general methods */

    function checkTopElementInLayers(mouseX, mouseY) {
        var topElement = null;
        
        for (var i = layers.length - 1; i >= 0 && topElement === null; i--) {
            topElement = checkTopElement(layers[i]._children, mouseX, mouseY);
        }

        return topElement;
    }

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

    /* end of general methods */

    canvas.addEventListener('wheel', function (e) {
        var direction = (e.detail < 0 || e.wheelDelta > 0) ? 1 : -1;

        if (LastTopElement && LastTopElement.mouseWheel instanceof Function) {
            LastTopElement.mouseWheel(CurrentMousePosition.x, CurrentMousePosition.y, direction, e);
        } else if (DragElement && DragElement.mouseWheel instanceof Function) {
            DragElement.mouseWheel(CurrentMousePosition.x, CurrentMousePosition.y, direction, e);
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
            DragElement = LastTopElement;
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

        if (DragElement && DragElement.mouseUp instanceof Function) {
            DragElement.mouseUp(e);
            DragElement = null;
        }
    });


    canvas.addEventListener('mousemove', function (e) {
        var mouseX = e.clientX / window.innerWidth - 0.5;
        var mouseY = 0.5 - e.clientY / window.innerHeight;

        mouseX = camera.x + mouseX * camera.w;
        mouseY = camera.y + mouseY * camera.h;

        CurrentMousePosition.x = mouseX;
        CurrentMousePosition.y = mouseY;
        
        if(DragElement !== null) {
            
            if (DragElement && DragElement.mouseMove instanceof Function) {
                DragElement.mouseMove(mouseX, mouseY);
            }
            
            LastTopElement = DragElement;
            
        } else {
        
            var topElement = checkTopElementInLayers(mouseX, mouseY);

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
        
        }

    });

    // methods

    var eventInterval = setInterval(function () {

        if (DragElement !== null && DragElement.draggable) {
            drag(DragElement);
        }

        if (LastTopElement !== null) {

            if (LastTopElement.rotatable) {
                rotate(LastTopElement);
            }
        }

        LastMousePosition.x = CurrentMousePosition.x;
        LastMousePosition.y = CurrentMousePosition.y;

    }, 2);

    function sumWithLimit(currentVal, limitVal, icr) {
        var ret = 0;

        var target = currentVal + icr;

        if (!limitVal || (target > -limitVal && target < limitVal)) {
            ret = icr;
        }

        return ret;
    }

    function dragMouseDown(element) {
        document.body.style.cursor = 'move';

        var moveX = CurrentMousePosition.x - LastMousePosition.x;
        var moveY = CurrentMousePosition.y - LastMousePosition.y;

        element.x += sumWithLimit(element.x, element.dragLimitX * GameInstance.Camera.w, moveX);
        element.y += sumWithLimit(element.y, element.dragLimitY * GameInstance.Camera.h, moveY);
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
