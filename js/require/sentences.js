define(function(require){
    var sentences = {},
        wordRE = /([0-9]*[а-яА-ЯёЁa-zA-Z]+[а-яА-ЯёЁa-zA-Z0-9]*)/gi;
    sentences.words = function(str){
        if (str.length === 0) return false;
        return str.match(wordRE).join(', ');
    };
    sentences.countWords = function(str){
        var result;
        if (str.length === 0) result = 0;
        result = str.match(wordRE).length;
        return result;
    };
    sentences.longestWord = function(str){
        var result,
            split = str.match(wordRE);
        var result = split.reduce(function(curLongest, cur){
            if (cur.length > curLongest.length) {
                return cur;
            } else {
                return curLongest;
            };
        });
        return result;
    };
    console.log('module sentences loaded');
    return sentences;
});