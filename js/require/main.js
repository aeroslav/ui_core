define(function(require) {
    var app = require('app'),
        bts = require('bootstrap')
        sentences = require('sentences'),
        numbers = require('numbers');

        console.log('bts =', bts);
    app.init('#txt',
        sentences.words,
        sentences.countWords,
        numbers.num,
        numbers.countNum,
        sentences.longestWord);
    $('#txt').change(function(){
        var res = app.exec($('#txt').val());
        app.showResults($('.results span'));
    });
    $('#myModal').on('shown.bs.modal', function () {
        $('#myInput').focus();
    });
});