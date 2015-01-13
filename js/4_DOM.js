//---DOM---
console.log('---DOM---');

console.log(document.location.href); //analog of window.location

//--navigating
console.log('--navigating--');

var fn = [],
    counter = 0,
    e;
fn[0] = function () {
    console.log('by ID');
    e = document.getElementById('specialNode');
    e.style.fontStyle = 'italic';
};
fn[1] = function () {
    console.log('by TagName');
    e = document.getElementsByTagName('span');
    for (var i = 0; i<e.length; i++) {
        e[i].style.backgroundColor = 'hsl(210, 70%, 80%)';
    }
};
fn[2] = function () {
    console.log('by ClassName');
    e = document.getElementsByClassName('listItem');
    for (var i = 0; i<e.length; i++) {
        e[i].style.border = '1px solid #333';
        e[i].style.marginBottom = '.6em';
    }
};
fn[3] = function() {
    console.log('querySelector');
    var e = document.querySelector('.list');
    e.style.width = '50%';
    e.style.margin = '0 auto';
    e.style.backgroundColor = 'hsl(160,80%,90%)';
};
fn[4] = function() {
    console.log('querySelectorAll');
    var e = document.querySelectorAll('.listItem');
    for (var i = 0; i<e.length; i++) {
        e[i].className += ' listItemHighlighted';
    }
}

//--elements
fn[5] = function() {
    console.log('--elements--');
    document.querySelector('.listItem:last-of-type>span').innerHTML = 'MCSS - developed in Odnoklassniki';
    console.log('innerHTML changed');
};
fn[6] = function() {
    console.log('-data-attribute set and get');
    e = document.querySelector('#specialNode');
    e.setAttribute('data-attr', 'custom data-attribute');
    console.log(e.getAttribute('data-attr'));
}
fn[7] = function() {
    console.log('-createDocumentFragment');
    var df = document.createDocumentFragment(),
        el = document.createElement('li'),
        el2 = document.createElement('span');

    el.className = 'listItem';
    console.log('-appendChild');
    el2.innerHTML = 'SCSSM (Super CSS Methodology)';
    el.appendChild(el2);
    df.appendChild(el);
    document.querySelector('.list').appendChild(df);
};
fn[8] = function() {
    console.log('-replaceChild');
    var el = document.querySelector('.listItem:last-of-type>span');
    var rEl = document.createElement('strong');
    rEl.innerHTML = 'wat?';
    document.querySelector('.listItem:last-of-type').replaceChild(rEl,el);
};
fn[9] = function() {
    console.log('-removeChild');
    var el = document.querySelector('.listItem:last-of-type');
    document.querySelector('.list').removeChild(el);
}

//--events
fn[10] = function() {
    console.log('--events--');
    console.log('test custom event');

    function highlightCurrentTarget(ev) {
        console.log('catched custom event, currentTarget =', ev.currentTarget, ' target =', ev.target);
        that = ev.currentTarget;
        function highlight(){
            that.style.backgroundColor = 'hsl(100, 80%, 90%)';
        };
        highlight();
    };
    document.querySelector('.list').addEventListener('custom', highlightCurrentTarget);
    document.querySelector('.listItem').addEventListener('custom', highlightCurrentTarget);
};
fn[11] = function() {
    var ev = new Event('custom', {"bubbles": true, "cancelable": false});
    document.querySelector('.listItem>span').dispatchEvent(ev);
}
function colorChanger(ev,delay) {
    var color = ev.currentTarget.style.backgroundColor,
        that = ev.currentTarget;
    function setNewColor() {
        that.style.backgroundColor = 'hsl(10,70%,70%)';
    }
    function setPrevColor() {
        that.style.backgroundColor = color;
    };

    setTimeout(setNewColor, delay);
    setTimeout(setPrevColor,delay+500);
};
fn[12] = function() {
    var els = document.querySelectorAll('.listItem>span');
    for (var i = 0; i < els.length; i++) {
        els[i].addEventListener('click', function(ev, prop) {
            ev.stopPropagation();
            colorChanger(ev,0);
        });
    };
    els = document.querySelectorAll('.listItem');
    for (var i = 0; i < els.length; i++) {
        els[i].addEventListener('click', function(ev) {
            colorChanger(ev,0);
        });
    };
    document.querySelector('.list').addEventListener('click', function(ev) {
        colorChanger(ev,200);
    });;
    console.log('--Events set, click any element--');
    console.log('spans - no propagation, li - propagation');
};

//executor of fns above
timer = setInterval(function(){
    fn[counter]();
    counter++;
    if (counter >= fn.length) {
        clearInterval(timer);
        console.log('----finish----');
    }
},300);

document.querySelector('.newScript').addEventListener('click', function(e) {
    console.log('-loading new script-');
    var newScript = document.createElement('script');
    newScript.setAttribute('src','../js/4_DOM_additional.js');
    document.querySelector('body').appendChild(newScript);
});
document.querySelector('.newStyle').addEventListener('click', function(e) {
    console.log('-loading new stylesheet-');
    var newStyle = document.createElement('link');
    newStyle.setAttribute('rel','stylesheet');
    newStyle.setAttribute('href','../css/4_DOM_additional.css');
    document.querySelector('head').appendChild(newStyle);
});