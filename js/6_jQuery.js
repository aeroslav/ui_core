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
    loadList: function(list){ //passed string parsed to JSON object and stored to inner var.
        if (list instanceof Object) {
            this.booksList = list;
        } else {
            this.booksList = JSON.parse(list);
        }
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

            recAttr.init(['span','span','p'], [25,25,150], this.booksList[0]);

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

//jQuery realization of 5_AJAX

//init json printer
printer.elName = document.querySelector('.bookslist');

//btns handlers adding
//1. GET
$('.btn-getJSON').click( function(ev){

    var url = 'http://localhost:8080/books.json';

    $.ajax({
        url: url,
        type: 'GET'
    }).done(function(resp,status,xhr){
        if (xhr.getResponseHeader('Content-Type') === 'application/json') {
            $('.bookslist').empty();
            printer.loadList(resp);
            printer.renderToDOM();
        }
    }).done(function(){
        if ($('p').first().children('.tip').length == 0) {
            $('p').first().append('<span class=\'tip\'>Try to hover on any element of list</span>');
        }
        $(document).trigger('eventInit');
        //bindEvents();
    }).fail(function(){
        console.log('something gone wrong!');
    });
});

//2. POST
$('.btn-postJSON').click( function(ev) {

    var url = 'http://localhost:8080/processJSON',
        login = $('#login').val(),
        pwd = $('#pwd').val(),
        comment = $('#comment').val(),
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

    $.ajax({
        type: 'POST',
        url: url,
        data: postBody,
        contentType: 'application/json',
        dataType: 'text',
        success: function(resp, status, xhr) {
            console.log(status);
            console.log(xhr.getResponseHeader('Content-Type'));
            if (xhr.getResponseHeader('Content-Type') === 'text/xml') {
                $('.responseText').text(resp);
            };
            $(document).trigger('eventInit');
        },
        error: function(xhr, status) {
            console.log(status);
        }
    });
});

function bindEvents(){
    $('.book').hover(function(e){ //shorthand for setting event handler or call event
        var offset = $(this).offset(),
            top = offset.top + $(this).height()/2 - 4,
            left = offset.left + $(this).outerWidth() + 10;
        $('.tooltip').css({
            'display': 'block',
            'top': top,
            'left': left
        })
    }, function(e){
        $('.tooltip').css({
            'display': 'none',
        });
    });

    $('.bookslist').on('click', '.book', function(e){  //delegated event handling -  if selector specifies for 'on', then event will be handled only for them
        e.stopPropagation();
        $(this).toggleClass('js-selected');
    });

    $(document).on('keypress', function(e){
        if (e.keyCode === 32) {
            if ($('.js-selected').length) {
                var fragm = $('.js-selected').clone();
                fragm.appendTo('.bookslist');
                fragm.trigger('domChange');
                $('.js-selected').removeClass('js-selected');
            }
        }
    });

    $('.bookslist').on('domChange', '.book', function(e){  // handling custom event
        console.log(e.target);
    });
}

$(document).ready(function(){
    $(document).one('eventInit', function(){  // event will be handled only once
        bindEvents();
    });

    $('#testForm').on('submit', function(e){
        e.preventDefault();
        console.log($('#testForm').serialize());  // serializes form to url query string
        //> login2=qwe&pwd2=qwe&comment2=qwe
        var serialized = $('#testForm').serializeArray();
        console.log(serialized);  // serializes form to arrayof object (JSON) format
        //> [{"login2": "qwe"},{"pwd2": "qwe"},{"comment2": "qwe"}]
        console.log($.param(serialized));  // serializes json to url query string; performs deep serialization
        //> login2=qwe&pwd2=qwe&comment2=qwe
    });
});