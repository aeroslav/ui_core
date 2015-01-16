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

        if (_.isObject(el)&&(el.title !== '')) {
            tplData = {
                el: el,
                tags: tags,
                lengths: lengths //<<<<<<<---------------------------- Is there are cases in which order of proprties of object breaks?
            }

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
            printer.renderToDOM();
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