var DrawPriceChart = function(){

    this.canvasObject = {};
    this.pricesDataBuffer = {};
    this.currentMouseValue = null;

    this.initDrawObject = function(canvasObject,pricesDataBuffer){
        this.canvasObject = canvasObject;
        this.pricesDataBuffer = pricesDataBuffer;
        this.pricesDataBuffer.initCanvasObject(this.canvasObject);
    }
    this.initPricesLines = function(pricesArray){
        this.pricesDataBuffer.initPricesBuffer(pricesArray);
        this.pricesDataBuffer.genratingAllDrawnObject();
        this.redraw();
    }
    this.addPriceSample = function(data){
        this.pricesDataBuffer.push(data);
        this.pricesDataBuffer.genratingAllDrawnObject();
        this.redraw();
    }
    this.drawPriceTimeValue = function(pos){
        this.currentMouseValue = this.pricesDataBuffer.getPriceTime(pos);
        this.redraw();
    }
    this.redraw = function(){
        CanvasUtils.clearCanvasObject(this.canvasObject);
        CanvasUtils.drawArrayLines(this.canvasObject.getContext("2d"),this.pricesDataBuffer.drawnTableLines);
        CanvasUtils.drawArrayTexts(this.canvasObject.getContext("2d"),this.pricesDataBuffer.drawnTimeAxis);
        CanvasUtils.drawArrayTexts(this.canvasObject.getContext("2d"),this.pricesDataBuffer.drawnPricesAxis);
        CanvasUtils.drawConnectedArrayLines(this.canvasObject.getContext("2d"),this.pricesDataBuffer.drawnPricesLine);
        if(this.currentMouseValue!=null){
            CanvasUtils.drawLine(this.canvasObject.getContext("2d"),{
                strokeStyle: "#797e87",
                lineWidth: 1,
                startX: this.currentMouseValue.x,
                endX: this.currentMouseValue.x,
                startY: 0,
                endY: this.canvasObject.height - 60
            })

            CanvasUtils.drawRect(this.canvasObject.getContext("2d"),{
                fillStyle: "#c6c6c6",
                lineWidth: 1,
                x: this.currentMouseValue.x+5,
                y: this.currentMouseValue.y-10,
                width: 80,
                height: 40,
            })

            CanvasUtils.drawText(this.canvasObject.getContext("2d"),{
                value: ""+this.currentMouseValue.fair_value+" usd",
                x: this.currentMouseValue.x+10,
                y: this.currentMouseValue.y+5

            })
            var date = new Date(this.currentMouseValue.timestamp);
            var hours = date.getHours();
            var minutes = date.getMinutes();
            var seconds = date.getSeconds();
            var timeText = "" + (hours>=10?hours:"0"+hours)+
                            ":"+""+(minutes>=10?minutes:"0"+minutes)+
                            ":"+""+(seconds>=10?seconds:"0"+seconds);
            CanvasUtils.drawText(this.canvasObject.getContext("2d"),{
                value: timeText,
                x: this.currentMouseValue.x+10,
                y: this.currentMouseValue.y+22
            })
            
        }
    }
}

DrawPriceChart._instance = null;
DrawPriceChart.getInstance = function () {
    if (DrawPriceChart._instance == null) {
        DrawPriceChart._instance = new DrawPriceChart();
    }
    return DrawPriceChart._instance;
};