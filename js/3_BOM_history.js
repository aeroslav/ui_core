'use strict';
console.log('---history---');

var historyController = {
    btnsHistory: null,
    btnsBgs: null,
    bgs: [
        '',
        'http://subtlepatterns.com/patterns/upfeathers.png',
        'http://subtlepatterns.com/patterns/noisy_grid.png',
        'http://subtlepatterns.com/patterns/whitediamond.png'
    ],
    init: function() {
        this.btnsHistory = document.querySelectorAll('.history'),
        this.btnsBgs = document.querySelectorAll('[data-bg]');

        Array.prototype.forEach.call(this.btnsHistory, function(e){
            e.addEventListener('click', historyController.historyHandler);
        });
        Array.prototype.forEach.call(this.btnsBgs, function(e){
            e.addEventListener('click', historyController.bgHandler);
        });
    },
    historyHandler: function(ev){
        if (ev.target.className.search(/prev/gi) !== -1) {
            window.history.back();
        };
        if (ev.target.className.search(/next/gi) !== -1) {
            window.history.forward();
        };
        if (ev.target.className.search(/go/gi) !== -1) {
            var goLevel = prompt('Enter amount of steps', 1); // <<<<<<<<<<------------------------------------------to top???
            window.history.go(goLevel); // 0 - reload, if out of range - nothing
        };
    },
    bgHandler: function(ev) {
        var imgIndex = ev.target.getAttribute('data-bg'),
            bg = ev.target.innerHTML;
        document.body.style.backgroundImage = 'url(' + historyController.bgs[imgIndex] + ')';
        window.history.pushState({"bgIndex": imgIndex}, null, '#'+imgIndex);
    }

};

window.addEventListener('load', function(e) {
    console.log('history stack length =', window.history.length);
    if (location.hash) {
        document.body.style.backgroundImage = 'url(' + historyController.bgs[parseInt(location.hash.substr(1),10)] + ')';
    };
});

historyController.init();

//push/replace
document.addEventListener('popstate', function(e) {
    var imgIndex = e.state['bgIndex'] || 0;
    if (imgIndex) {
        document.body.style.backgroundImage = 'url(' + historyController.bgs[imgIndex] + ')';
    }
});