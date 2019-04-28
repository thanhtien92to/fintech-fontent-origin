PricesTimeUtils = {};

PricesTimeUtils.minMaxPrices = function(pricesArray){
    var minPrices = {
        pos: -1,
        val: {
            fair_value: 0
        } 
    };
    var maxPrices = {
        pos: -1,
        val: {
            fair_value: 0
        }
    };
    var pricesArrayLength  = pricesArray.length;
    for(i=0;i<pricesArrayLength; i++){
        var prices = pricesArray[i];
        if(i==0
            ||(i!=0&&minPrices.val.fair_value>prices.fair_value)
            ){
                minPrices.val = prices;
                minPrices.pos = i;
        }
        if(maxPrices.val.fair_value < prices.fair_value){
            maxPrices.val = prices;
            maxPrices.pos = i;
        }
    }
    return {
        minPrice: minPrices,
        maxPrice: maxPrices
    }
}

PricesTimeUtils.minMaxTime = function(pricesArray){
    var minPrices = {
        pos: -1,
        val: {
            timestamp: 0
        } 
    };
    var maxPrices = {
        pos: -1,
        val: {
            timestamp: 0
        }
    };
    var pricesArrayLength  = pricesArray.length;
    for(i=0;i<pricesArrayLength; i++){
        var prices = pricesArray[i];
        if(i==0
            ||(i!=0&&minPrices.val.timestamp>prices.timestamp)
            ){
                minPrices.val = prices;
                minPrices.pos = i;
        }
        if(maxPrices.val.timestamp < prices.timestamp){
            maxPrices.val = prices;
            maxPrices.pos = i;
        }
    }
    return {
        minPrice: minPrices,
        maxPrice: maxPrices
    }
}

PricesTimeUtils.getTimeArrayAxis = function(pricesArray,timeStep = 2, timeUnit = "minute", nStep = 17){
    var minMaxTime = PricesTimeUtils.minMaxTime(pricesArray);
    var endPrice = minMaxTime.maxPrice.val;
    var endTimeStamp = endPrice.timestamp;
    var date = new Date(endTimeStamp);
    var fullYear = date.getFullYear();
    var month = date.getMonth();
    var day = date.getDate();
    var hours = date.getHours();
    var minutes = date.getMinutes();

    if(minutes>60-timeStep){
        minutes = 0;
        hours = hours+1;
    }
    else{
        if((minutes%timeStep)==0){
            minutes+=timeStep;
        }
        else{
            minutes = (minutes/timeStep)*timeStep+timeStep;
        }
    }
    var endTime = new Date(fullYear,month,day,hours,minutes,0,0);
    var endTimeStamp = endTime.getTime();

    var timeStampArray = [];
    timeStampArray[0] = endTimeStamp;
    for(i=1; i<nStep; i++){
        timeStampArray[i] = timeStampArray[i-1]-timeStep*60*1000;
    }
    return timeStampArray;
}

PricesTimeUtils.getPricesArrayAxis = function(pricesArray){
    var minMaxPrices = PricesTimeUtils.minMaxPrices(pricesArray,"fair_value");
    var maxDis = minMaxPrices.maxPrice.val.fair_value - minMaxPrices.minPrice.val.fair_value;
    var disPrice = maxDis*1.2;
    var stepPrice = disPrice/10;
    var startPrice = minMaxPrices.minPrice.val.fair_value - 0.1*maxDis;
    var pricesAxis = [];
    pricesAxis[0] = startPrice;
    for(i=1;i<11;i++){
        pricesAxis[i] = pricesAxis[i-1]+stepPrice;
    }
    return pricesAxis
}