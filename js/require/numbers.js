define(function(require){
    var numbers = {},
        numRE = /(?:^|\s)[0-9]+(?![a-zA-Z0-9]+)/gi; 
    numbers.num = function(str){
        return str.match(numRE).map(function(n){
            return parseInt(n,10);
        });
    };
    numbers.countNum = function(str){
        var result;
        if (str.length === 0) result = 0;
        result = str.match(numRE).length;
        console.log('countNum =', result);
        return result;
    };
    console.log('module numbers loaded');
    return numbers;
});