'use strict';

app = {
    reqBtn: null,
    reqXHR: null,
    init: function(reqBtn) {
        this.reqBtn = reqBtn;
    },
    reqSend: function() {

    },
    reqRecieve: function() {

    }
};

function ajaxApp(reqBtn) {
    this.reqBtn = reqBtn;
    this.XHR = new XMLHttpRequest(); //<<<<<<<<<<<---------------------------------how to make it private?
    this.responseHandler = function(callb) {
        if (this.XHR.readyState != 4) return;

        callb(this.XHR.responseText);

        console.log(this.XHR.status);
        if (this.status != 200) {
            console.log('request returned error');
        }
        return;
    };
    this.send = function(reqType, reqURL, reqBody, callb) {
        this.XHR.open(reqType, reqURL, true);
        this.XHR.onreadystatechange = this.responseHandler(callb);
        this.XHR.send('reqBody');
    };
};

ajax = new ajaxApp(document.querySelector('.requestSender'));


//-----------------------
var xhr = new XMLHttpRequest();
.addEventListener('click', function(e) {
    
});
xhr.open('GET', '/my/url', true);
xhr.onreadystatechange = function() {
  if (this.readyState != 4) return;
  // по окончании запроса доступны:
  // status, statusText
  // responseText, responseXML (при content-type: text/xml)
  if (this.status != 200) {
    console.log('request returned error');
    // обработать ошибку
    return;
  }
  // получить результат из this.responseText или this.responseXML
}
xhr.send('');