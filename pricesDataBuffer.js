var PricesDataBuffer = function () {
    this.pricesBuffer = [];
    this.gridLine = [];
    this.pricesAxis = [];
    this.timeAxis = [];
    this.canvasObject = {};
    this.drawnTimeAxis = [];
    this.drawnPricesAxis = [];
    this.drawnTableLines = [];
    this.drawnPricesLine = [];

    this.initCanvasObject = function(canvas){
        this.canvasObject = canvas;
    };

    this.initPricesBuffer = function(data){
        this.pricesBuffer = data;
    };
    this.push = function(item){
        this.pricesBuffer.push(item);
    };
    this.generatingCordinate = function(){
        this.pricesAxis = PricesTimeUtils.getPricesArrayAxis(this.pricesBuffer);
        this.timeAxis = PricesTimeUtils.getTimeArrayAxis(this.pricesBuffer);
        this.drawnPricesAxis = [];
        this.drawnTimeAxis = [];
        for(var i = 0; i<10; i++){
            var drawnPrices = {};
            drawnPrices.fillStyle = "red";
            drawnPrices.textAlign = "left";
            drawnPrices.value = this.pricesAxis[10-i];
            drawnPrices.x = this.canvasObject.width-74;
            drawnPrices.y = i*(this.canvasObject.height-60)/10+10;
            this.drawnPricesAxis.push(drawnPrices);
        }
    
        for(var i = 0; i <16; i++){
            var drawnTime = {};
            var date = new Date(this.timeAxis[16-i]);
            var hours = date.getHours();
            var minutes = date.getMinutes();
            var timeText = "" + (hours>=10?hours:"0"+hours)+":"+""+(minutes>=10?minutes:"0"+minutes);
            drawnTime.fillStyle = "red";
            drawnTime.textAlign = "left";
            drawnTime.value = timeText;
            drawnTime.x = i*(this.canvasObject.width-80)/16;
            drawnTime.y = this.canvasObject.height-50;
            this.drawnTimeAxis.push(drawnTime);
        }

        this.drawnTableLines = [];
        var startWidth = ((this.canvasObject.width-80)/16);
        var startHeight = ((this.canvasObject.height-60)/10);
        var rowDis = (this.canvasObject.height-60)/10;
        var colDis = (this.canvasObject.width-80)/16;

        for(var i=0; i<10; i++){
            var drawnTableItem = {};
            drawnTableItem.strokeStyle = "#e2e2e2";
            drawnTableItem.startX = 0;
            drawnTableItem.lineWidth= 1,
            drawnTableItem.startY = this.canvasObject.height-60-(startHeight+i*rowDis);
            drawnTableItem.endX = this.canvasObject.width-80;
            drawnTableItem.endY = this.canvasObject.height-60-(startHeight+i*rowDis);
            this.drawnTableLines.push(drawnTableItem);
        }
        for(var i=0; i<16; i++){
            var drawnTableItem = {};
            drawnTableItem.strokeStyle = "#e2e2e2";
            drawnTableItem.lineWidth= 1,
            drawnTableItem.startX = this.canvasObject.width-80-(startWidth+i*colDis);
            drawnTableItem.startY = 0;
            drawnTableItem.endX = this.canvasObject.width-80-(startWidth+i*colDis);
            drawnTableItem.endY = this.canvasObject.height-60;
            this.drawnTableLines.push(drawnTableItem);
        }

        this.drawnTableLines.push({
            strokeStyle: "#000000",
            lineWidth: 1,
            startX: this.canvasObject.width-80,
            startY: 0,
            endX: this.canvasObject.width-80,
            endY: this.canvasObject.height
        });
        
        this.drawnTableLines.push({
            strokeStyle: "#000000",
            lineWidth: 1,
            startX: 0,
            startY: this.canvasObject.height-60,
            endX: this.canvasObject.width,
            endY: this.canvasObject.height-60
        })
    };
    this.generatingPricesLine = function(){
        this.drawnPricesLine = [];
        for(var i = 0; i<this.pricesBuffer.length; i++){
            var fair_value = this.pricesBuffer[i].fair_value;
            var timestamp = this.pricesBuffer[i].timestamp;

            var x = ((timestamp - this.timeAxis[this.timeAxis.length-1])/(32*60*1000))*(this.canvasObject.width-80);
            var y = ((this.pricesAxis[this.pricesAxis.length-1]-fair_value)/(this.pricesAxis[this.pricesAxis.length-1]-this.pricesAxis[0]))*(this.canvasObject.height-60);

            this.drawnPricesLine.push({
                strokeStyle: "#af0303",
                lineWidth: 1,
                x: x,
                y: y,
                fair_value: fair_value,
                timestamp: timestamp
            });
        }
    };
    this.genratingAllDrawnObject = function(){
        this.generatingCordinate();
        this.generatingPricesLine();
    }
    this.getPriceTime = function(pos){
        if(pos.x<0||pos.y<0||pos.x>this.canvasObject.width||pos.y>this.canvasObject.height){
            return null;
        }
        else{
            var dis = Math.abs(this.drawnPricesLine[0].x-pos.x);
            var index = 0;
            for(var i = 1; i<this.drawnPricesLine.length; i++){
                if(dis>Math.abs(this.drawnPricesLine[i].x-pos.x)){
                    dis = Math.abs(this.drawnPricesLine[i].x-pos.x);
                    index = i;
                }
            }
            return this.drawnPricesLine[index];
        } 
    }
}

PricesDataBuffer._instance = null;
PricesDataBuffer.getInstance = function () {
    if (PricesDataBuffer._instance == null) {
        PricesDataBuffer._instance = new PricesDataBuffer();
    }
    return PricesDataBuffer._instance;
};