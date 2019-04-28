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
CanvasUtils.drawLine = function(_canvasContext,property){
    if(property.strokeStyle){
        _canvasContext.strokeStyle = property.strokeStyle;
    }
    if(property.lineWidth){
        _canvasContext.lineWidth = property.lineWidth;
    }
    // _canvasContext.translate(0.5, 0.5);
    _canvasContext.beginPath();
    _canvasContext.moveTo(property.startX,property.startY);
    _canvasContext.lineTo(property.endX,property.endY);
    _canvasContext.stroke();
}

/**
 * property = {
 *  strokeStyle: String, // option
 *  lineWidth: int, // option
 *  nCol: int, // mandatory
 *  nRow: int, // mandatory
 *  colDis: int, // mandatory
 *  rowDis: int, // mandatory
 *  canvWidth: int, // mandatory
 *  canvHeight: int, // mandatory
 *  startWidth: int, // option
 *  startHeight: int, // option
 * }
 */
CanvasUtils.drawTableLine = function(_canvasContext,property){
    _canvasContext.strokeStyle = property.strokeStyle||"#000000";
    _canvasContext.lineWidth = property.lineWidth||1;
    var startWidth = property.startWidth||0;
    var startHeight = property.startHeight||0;
    for(var i=0; i<property.nRow; i++){
        CanvasUtils.drawLine(_canvasContext,{
            startX: 0,
            startY: property.canvHeight-(startHeight+i*property.rowDis),
            endX: property.canvWidth,
            endY: property.canvHeight-(startHeight+i*property.rowDis)
        })
    }
    for(var i=0; i<property.nCol; i++){
        CanvasUtils.drawLine(_canvasContext,{
            startX: property.canvWidth-(startWidth+i*property.colDis),
            startY: 0,
            endX: property.canvWidth-(startWidth+i*property.colDis),
            endY: property.canvHeight
        })
    }

}

/**
 * property = {
 *  canvWidth: int, // mandatory
 *  canvHeight: int, // mandatory
 *  timeAxis: array, // mandatory
 *  pricesAxis: array, // mandatory
 * }
 */
CanvasUtils.drawAxis = function(_canvasContext,property){

    CanvasUtils.drawTableLine(
        _canvasContext,{
            strokeStyle: "#e2e2e2",
            nCol:15,
            nRow: 10,
            rowDis: (property.canvHeight-60)/10,
            colDis: (property.canvWidth-80)/16,
            canvWidth: (property.canvWidth-80),
            canvHeight: (property.canvHeight-60),
            startWidth: ((property.canvWidth-80)/16),
            startHeight: ((property.canvHeight-60)/10)
        }
    );

    for(var i = 0; i<10; i++){
        _canvasContext.fillStyle = "red";
        _canvasContext.textAlign = "left";
        _canvasContext.fillText(property.pricesAxis[10-i], property.canvWidth-74, i*(property.canvHeight-60)/10+10);
    }

    for(var i = 0; i <16; i++){
        var date = new Date(property.timeAxis[16-i]);
        var hours = date.getHours();
        var minutes = date.getMinutes();
        var timeText = "" + (hours>=10?hours:"0"+hours)+":"+""+(minutes>=10?minutes:"0"+minutes);
        _canvasContext.fillStyle = "red";
        _canvasContext.textAlign = "left";
        _canvasContext.fillText(timeText, i*(property.canvWidth-80)/16,property.canvHeight-50);
    }

    CanvasUtils.drawLine(_canvasContext,{
        strokeStyle: "#000000",
        lineWidth: 1,
        startX: property.canvWidth-80,
        startY: 0,
        endX: property.canvWidth-80,
        endY: property.canvHeight
    });
    
    CanvasUtils.drawLine(_canvasContext,{
        strokeStyle: "#000000",
        startX: 0,
        startY: property.canvHeight-60,
        endX: property.canvWidth,
        endY: property.canvHeight-60
    })
}

/**
 * property = {
 *  canvWidth: int, // mandatory
 *  canvHeight: int, // mandatory
 *  timeAxis: array, // mandatory
 *  pricesAxis: array, // mandatory
 *  pricesArray: array, // mandatory
 * }
 */

CanvasUtils.drawPricesLine = function(_canvasContext,property){
    var timeAxis = property.timeAxis;
    var pricesAxis = property.pricesAxis;
    var pricesArray = property.pricesArray;
    for(var i = 0; i<pricesArray.length-1; i++){
        var price1 = pricesArray[i].fair_value;
        var timeStamp1 = pricesArray[i].timestamp;
        var price2 = pricesArray[i+1].fair_value;
        var timeStamp2 = pricesArray[i+1].timestamp;

        var startX = ((timeStamp1 - timeAxis[timeAxis.length-1])/(32*60*1000))*(property.canvWidth-80);
        var startY = ((pricesAxis[pricesAxis.length-1]-price1)/(pricesAxis[pricesAxis.length-1]-pricesAxis[0]))*(property.canvHeight-60);
        var endX = ((timeStamp2 - timeAxis[timeAxis.length-1])/(32*60*1000))*(property.canvWidth-80);
        var endY = ((pricesAxis[pricesAxis.length-1]-price2)/(pricesAxis[pricesAxis.length-1]-pricesAxis[0]))*(property.canvHeight-60);
        CanvasUtils.drawLine(_canvasContext,{
            strokeStyle: "#af0303",
            lineWidth: 1,
            startX: startX,
            startY: startY,
            endX: endX,
            endY: endY
        });
    }
}