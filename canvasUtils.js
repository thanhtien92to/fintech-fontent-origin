CanvasUtils = {};

/**
 * property = {
 *  strokeStyle: String, // option
 *  lineWidth: int, // option
 *  startX: int, // mandatory
 *  startY: int, // mandatory
 *  endX: int, // mandatory
 *  endY: int, // mandatory
 * }
 */
CanvasUtils.drawLine = function (_canvasContext, property) {
    if (property.strokeStyle) {
        _canvasContext.strokeStyle = property.strokeStyle;
    }
    if (property.lineWidth) {
        _canvasContext.lineWidth = property.lineWidth;
    }
    // _canvasContext.translate(0.5, 0.5);
    _canvasContext.beginPath();
    _canvasContext.moveTo(property.startX, property.startY);
    _canvasContext.lineTo(property.endX, property.endY);
    _canvasContext.stroke();
}

CanvasUtils.drawText = function (_canvasContext, property) {
    _canvasContext.fillStyle = "red";
    _canvasContext.textAlign = "left";
    _canvasContext.fillText(property.value, property.x, property.y);
}

CanvasUtils.drawArrayTexts = function(_canvasContext,arrayTexts){
    var len = arrayTexts.length;
    for (var i = 0; i < len; i++) {
        CanvasUtils.drawText(_canvasContext,arrayTexts[i]);
    }
}


CanvasUtils.drawArrayLines = function (_canvasContext, arrayLines) {
    var len = arrayLines.length;
    for (var i = 0; i < len; i++) {
        CanvasUtils.drawLine(_canvasContext,arrayLines[i]);
    }
}

CanvasUtils.drawConnectedArrayLines = function (_canvasContext, arrayLines) {
    var len = arrayLines.length;
    for (var i = 0; i < len - 1; i++) {
        CanvasUtils.drawLine(_canvasContext,{
            strokeStyle: arrayLines[i].strokeStyle,
            lineWidth: arrayLines[i].lineWidth,
            startX: arrayLines[i].x,
            startY: arrayLines[i].y,
            endX: arrayLines[i + 1].x,
            endY: arrayLines[i + 1].y,
        });
    }
}

CanvasUtils.clearCanvasObject = function(canvas){
    const context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);
}

CanvasUtils.drawRect = function(_canvasContext,property){
    if (property.fillStyle) {
        _canvasContext.fillStyle = property.fillStyle;
    }
    if (property.lineWidth) {
        _canvasContext.lineWidth = property.lineWidth;
    }
    _canvasContext.fillRect(property.x, property.y, property.width, property.height); 
}