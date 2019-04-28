window.onload = function () {
    var distance = 30 * 60 * 1000;
    var timeStamp = -1;
    var symbol = "btcusd";
    var type = "second";

    var mainPriceChart = document.getElementById("mainPriceChart");
    mainPriceChart.width = window.innerWidth * 0.8;
    mainPriceChart.height = window.innerHeight * 0.8;
    var mainPriceChartContext = mainPriceChart.getContext("2d");

    var priceChart = document.getElementById("priceChart");
    priceChart.width = window.innerWidth * 0.8;
    priceChart.height = window.innerHeight * 0.8;
    var priceChartContext = mainPriceChart.getContext("2d");

    var dataSocket = io("http://68.183.231.136:9000/", {
        autoConnect: true
    });

    var pricesArray = [];

    dataSocket.on('connect', function () {

        dataSocket.emit("get_prices", {
            symbol: symbol,
            type: type,
            timestamp: timeStamp,
            distance: distance
        }, function (data) {
            pricesArray = data.prices;
            reDrawChart();
        }
        )
        dataSocket.on("on_prices", function (data) {
            console.log(data);
            if (
                data.symbol == symbol
                && data.type == type
            ) {
                pricesArray.push(data);
                reDrawChart();
            }
        })
    })

    function reDrawChart() {
        mainPriceChartContext.clearRect(0, 0, mainPriceChart.width, mainPriceChart.height);
        mainPriceChartContext.fillStyle = "#f7f7f7"
        mainPriceChartContext.fillRect(0, 0, mainPriceChart.width, mainPriceChart.height);

        var arrayTimeAxis = PricesTimeUtils.getTimeArrayAxis(pricesArray);
        var arrayPricesAxis = PricesTimeUtils.getPricesArrayAxis(pricesArray);
        CanvasUtils.drawAxis(mainPriceChartContext, {
            canvWidth: mainPriceChart.width,
            canvHeight: mainPriceChart.height,
            timeAxis: arrayTimeAxis,
            pricesAxis: arrayPricesAxis
        })

        CanvasUtils.drawPricesLine(mainPriceChartContext, {
            canvWidth: mainPriceChart.width,
            canvHeight: mainPriceChart.height,
            timeAxis: arrayTimeAxis,
            pricesAxis: arrayPricesAxis,
            pricesArray: pricesArray
        })
    }
}
