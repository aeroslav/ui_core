'use strict';

// object for working with json
var printer = {
    elName: null,
    booksList: null,
    truncStr: function(str,lng) {
        if (str.length>lng) {
            str = str.substr(0,lng) + '&hellip;';
            return str;
        } else
            return str;
    },
    isObject: function (o) {
        if (typeof o == 'object') {
            if ( (o instanceof Array)||(o == null) ) {
                return false;
            } else {
                return true;
            };
        } else
            return false;
    },
    loadList: function(json){ //passed string parsed to JSON object and stored to inner var.
        this.booksList = JSON.parse(json);
    },
    printRecord: function(el){
        var df = document.createDocumentFragment(),
            rec,
            recAttr = {
                recNames: [],
                recEls: [],
                tags: [],
                lengths: [],
                init: function(tags,lengths,exObj){
                    for (var key in exObj) {
                        this.recNames.push(key);
                        this.recEls.push('');
                    }
                    this.tags = tags;
                    this.lengths = lengths;
                }
            };
            
        if (this.isObject(el)&&(el.title !== '')) {
            rec = document.createElement('li'),

            recAttr.init(['span','span','span'], [25,25,150], this.booksList[0]);

            recAttr.recNames.forEach(function(arrEl,i){
                recAttr.recEls[i] = document.createElement(recAttr.tags[i]);
                recAttr.recEls[i].innerHTML = this.truncStr(el[arrEl],recAttr.lengths[i]);
                recAttr.recEls[i].className = 'book-' + arrEl;
                rec.appendChild(recAttr.recEls[i]);
            }, this);

            rec.className = 'book cf';
            df.appendChild(rec);

            return df;
        } else
            return false;
    },
    formList: function() {
        var list = document.createDocumentFragment();
        this.booksList.forEach(function(el) {
            var record = this.printRecord(el);
            if (record) {
                list.appendChild(record);
            }
        }, this);
        return list;
    },
    sendToDOM: function(node){
        var where = this.elName;
        if (node instanceof Node) {
            where.appendChild(node);
        }
    },
    renderToDOM: function() {
        if (this.booksList !== null) {
            this.sendToDOM(this.formList());
            return true;
        } else {
            console.log('booksList is empty');
            return false;
        }
    }
};
//-- object for working with json

var ajax = (function(){ //<<<<<<<<---------------------------------- If we need more than 1 instance? 

    var XHR = new XMLHttpRequest();

    return {
        responseHandler: function(callb) {
            return function(){
                var contentType = '';
                console.log('ready state changed: ', XHR.readyState);
                if (XHR.readyState !== 4) return;

                console.log(XHR.status);
                if (XHR.status !== 200) {
                    console.log('request returned error');
                    return;
                }

                contentType = XHR.getResponseHeader('Content-Type');
                callb(XHR.responseText, contentType);
            };
        },
        send: function(reqType, reqURL, reqBody, callb) {
            XHR.open(reqType, reqURL, true);
            XHR.onreadystatechange = this.responseHandler(callb);
            XHR.send(reqBody);
        }
    };
})();

//init json printer
printer.elName = document.querySelector('.bookslist');

//btns handlers adding
//1. GET
document.querySelector('.btn-getJSON').addEventListener('click', function(ev){
    ev.stopPropagation();
    var url = 'http://localhost:8080/books.json';
    console.log(url);
    ajax.send('GET', url, null, function(resp, contentType){
        if (contentType === 'application/json') {
            printer.loadList(resp);
            printer.renderToDOM();
        };
    });
});

//2. POST
//---