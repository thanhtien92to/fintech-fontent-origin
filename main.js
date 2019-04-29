window.onload = function () {
    var distance = 30 * 60 * 1000;
    var timeStamp = -1;
    var symbol = "btcusd";
    var type = "second";

    var mainPriceChart = document.getElementById("mainPriceChart");
    mainPriceChart.width = window.innerWidth * 0.8;
    mainPriceChart.height = window.innerHeight * 0.8;

    var drawPriceChart = DrawPriceChart.getInstance();
    drawPriceChart.initDrawObject(mainPriceChart,PricesDataBuffer.getInstance());

    var dataSocket = io("http://68.183.231.136:9000/", {
        autoConnect: true
    });

    dataSocket.on('connect', function () {

        dataSocket.emit("get_prices", {
            symbol: symbol,
            type: type,
            timestamp: timeStamp,
            distance: distance
        }, function (data) {
            drawPriceChart.initPricesLines(data.prices);
        }
        )
        dataSocket.on("on_prices", function (data) {
            console.log(data);
            if (
                data.symbol == symbol
                && data.type == type
            ) {
                drawPriceChart.addPriceSample(data);
            }
        })
    })

    window.addEventListener('mousemove', showPriceTimeValue, false);

    function showPriceTimeValue(event){
        var pos = getMousePos(mainPriceChart,event);
        drawPriceChart.drawPriceTimeValue(pos);
    }
    function getMousePos(canvas, evt) {
        var rect = canvas.getBoundingClientRect();
        return {
            x: (evt.clientX - rect.left) / (rect.right - rect.left) * canvas.width,
            y: (evt.clientY - rect.top) / (rect.bottom - rect.top) * canvas.height
        };
    }
}
