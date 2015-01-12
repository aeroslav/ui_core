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
        e[i].style.border = '3px solid hsl(30,80%,80%)';
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
    var df = document.createDocumentFragment('li');
    df.className = 'listItem';
    //-------------------------------------------------------------------------------here!
    console.log('-appendChild');
    var el = document.createElement('span');
    el.innerHTML = 'SCSSM (Super CSS Methodology)';
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

//executor of fns above
timer = setInterval(function(){
    fn[counter]();
    counter++;
    if (counter >= fn.length) {
        clearInterval(timer);
        console.log('----finish----');
    }
},300);