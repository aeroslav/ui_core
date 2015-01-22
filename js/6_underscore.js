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

    loadList: function(json){
        this.booksList = JSON.parse(json);
    },

    printRecord: function(el, tags, lengths){

        var tpl = _.template(document.querySelector('.book-template').innerHTML, {variable: 'data'}), // get template from DOM by selector, set name for inner variable, in which passed object will be stored, and prepare for rendering
            df = document.createDocumentFragment(),
            rec = document.createElement('li'),
            tplData;

        console.log(this.truncStr);

        if (_.isObject(el)&&(el.title !== '')) {
            var keys = _.keys(el);

            _.each(keys, function (key, i){
                el[key] = this.truncStr(el[key], lengths[i]);
            }, this);
            tplData = {
                el: el,
                tags: tags
            };

            rec.className = 'book cf';
            rec.innerHTML = tpl(tplData); // render template with passed data
            df.appendChild(rec);
            return df;
        } else
            return false;
    },

    formList: function() {
        var list = document.createDocumentFragment();
        _.each(this.booksList, function(el) {
            var record = this.printRecord(el, ['span','span','p'], [25, 25, 150]);
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
            this.elName.innerHTML = '';
            this.sendToDOM(this.formList());
            return true;
        } else {
            console.log('booksList is empty');
            return false;
        }
    }
};
//-- object for working with json

var ajax = (function(){

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
            XHR.setRequestHeader('Content-Type', 'application/json');
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
            printer.booksList = _.shuffle(printer.booksList); //shuffles a list
            printer.renderToDOM();

            var books = printer.booksList;
            doSomeWith_(books);
        };
    });
});

//2. POST
document.querySelector('.btn-postJSON').addEventListener('click', function(ev) {
    var url = 'http://localhost:8080/processJSON',
        login = document.querySelector('#login').value,
        pwd = document.querySelector('#pwd').value,
        comment = document.querySelector('#comment').value,
        postJSON = [
            {
                "login": null,
                "pwd": null,
                "comment": null
            }
        ],
        postBody = '';

    postJSON["login"] = encodeURIComponent(login);
    postJSON["pwd"] = encodeURIComponent(pwd);
    postJSON["comment"] = encodeURIComponent(comment);
    postBody = JSON.stringify(postJSON);

    ev.stopPropagation();
    ajax.send('POST', url, postBody, function(resp, contentType){
        if (contentType === 'text/xml') {
            document.querySelector('.responseText').innerHTML = resp;
        }
    });
});


//---------------------------------- TRYING SOME _ FNS ------------------------------------------
console.log('some underscore fns');
//emulate click on '.btn-getJSON'
window.addEventListener('load', function(){
    var ev = new Event('click');
    document.querySelector('.btn-getJSON').dispatchEvent(ev);
});

function doSomeWith_(arr){

    console.log( _.where(arr, {author: 'Homer'}) ); //-where() looks in array for vals that contains all key-val pairs passed in args
    //> 0: Object
    //> author: "Homer"
    //> description: "Epic journey of epic hero."
    //> title: "The Odyssey"

    console.log( _.reject(arr, function(el){
        return el.title !== '';
    }) );
    //> 0: Object
    //> author: "Me"
    //> description: "I did't write any book yet :("
    //> title: ""

    console.log( _.pluck(arr, 'title') );
    //> ["The Odyssey", "Romeo and Juliet", "Don Quixote", "Necronomicon: the Book of Grim Rituals", "", "The Captain's Daughter", "The Holy Quran", "How to Draw Things"]

    console.log( _.sample(arr, 2) );
    //> 0: Object
    //> author: "Me"
    //> description: "I did't write any book yet :("
    //> title: ""
    //> 1: Object
    //> author: ""
    //> description: "Great philosophy, corrupted by extrimists in our days."
    //> title: "The Holy Quran"

    console.log( _.size(arr) ); 
    //> 8

    console.log( _.partition(arr, function(el){
        return el.title !== '';
    }) );
    //> [Array[7], Array[1]]

    console.log( _.intersection([1, 2, 3], [101, 2, 1, 10], [2, 1]) );
    //> [1, 2]

    var mouseTracker = _.throttle(function(e){ // allows to run fn once every 'wait' seconds
        var mx = document.querySelector('.mouse-x'),
            my = document.querySelector('.mouse-y');
        mx.textContent = e.clientX;
        my.textContent = e.clientY;
    }, 200);
    document.addEventListener('mousemove', mouseTracker);

    console.log( _.functions(printer) );
    //> ["formList", "loadList", "printRecord", "renderToDOM", "sendToDOM", "truncStr"]
};