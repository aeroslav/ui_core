//---BOM---
//--window
console.log('---window---');
console.log( window.closed ); //> false
console.log( window.document );
console.log( window.length ); //> 0 - number of frames
console.log( window.fullScreen ); //undefined
console.log( window.parent ); //> Window {top: Window, window: Window, location: Location, external: Object, chrome: Object…} //itself?
console.log( window.scrollbars ); //> BarProp {visible: true} //visibility of scrollbars
console.log( window.scrollX, window.scrollY ); //> 0 0 //returns the number of pixels that doc was scrolled
//window.alert('alert!'); - popup alert
//confirm('asd?'); - will show confirm popup with ok-cancel btns
//window.close(); - will close window
setTimeout(function(){
    scrollTo(0,10); // - scrolls to specified coords
    scrollBy(0,10); // - scrolls by specified coords
},1000); 
window.onmousemove = (function(e,delay){
    var mx = document.querySelector('.mouse-x'),
        my = document.querySelector('.mouse-y'),
        eventStorage = e||window;
    var showCoord = function (){
        mx.innerHTML = eventStorage.clientX;
        my.innerHTML = eventStorage.clientY;
        to = 0;
    };
    var showCoordThis = showCoord.bind(this);
    var to = setTimeout(showCoordThis,delay);
    return function(e){
        if (to) {
            return false
        } else {
            eventStorage = e;
            to = setTimeout(showCoordThis,delay);
        }
    };
})(event,200);

//--navigator
console.log('\n---navigator---');
console.log(navigator.userAgent);
//> Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.95 Safari/537.36
console.log(navigator.platform);
//> Win32

//-screen
console.log('\n---screen---');
console.log('W x H', screen.width, 'x', screen.height);
//> W x H 1920 x 1080

//--location
console.log('\n---location---');
//for more full logs tested in console on: http://www.w3schools.com/jsref/obj_location.asp

console.log('href =', location.href); //Sets or returns the entire URL
//> href = http://www.w3schools.com/jsref/obj_location.asp
console.log('hash =', location.hash); //return hash, including '#'
//> 
console.log('origin =', location.origin); //Returns the protocol, hostname and port number of a URL
//> origin = http://www.w3schools.com
console.log('hostname =', location.hostname); //Sets or returns the hostname of a URL
//> hostname = www.w3schools.com
console.log('host =', location.host); //Sets or returns the hostname and port number of a URL
//> host = www.w3schools.com
console.log('pathname =', location.pathname);
//> pathname = /jsref/obj_location.asp
console.log('port =', location.port);
//> port = 
console.log('protocol =', location.protocol);
//> protocol = http:
console.log('search =', location.search); //returns querystring (after '?')
//> search = 

console.log('Logs from http://www.w3schools.com/jsref/obj_location.asp');
console.log('href = http://www.w3schools.com/jsref/obj_location.asp',
    '\norigin = http://www.w3schools.com',
    '\nhostname = www.w3schools.com',
    '\nhost = www.w3schools.com',
    '\npathname = /jsref/obj_location.asp',
    '\nport = ',
    '\nprotocol = http:',
    '\nsearch = ');

//-assign() - loads a new document, leaves current document in history
//location.assign('http://www.w3schools.com/jsref/obj_location.asp');

//-replace() - loads a new document, deletes current document in history
//location.replace('http://www.w3schools.com/jsref/obj_location.asp');

//-replace() - reloads current document
//location.replace();