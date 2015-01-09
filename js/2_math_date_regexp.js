//---MATH
var x = 2.4,
    y = -3.2;
console.log('---MATH---');
console.log(x,y);
console.log('absolute value: ', Math.abs(x), Math.abs(y));
//> absolute value:  2.4 3.2
console.log('cube root: ', Math.cbrt(x), Math.cbrt(y));
//> cube root:  1.338865900164339 -1.4736125994561544
console.log('square root: ', Math.sqrt(x), Math.sqrt(y));
//> square root:  1.5491933384829668 NaN
console.log('power: ', Math.pow(Math.abs(y),x));
//> power:  16.306469705871248
console.log('ceil: ', Math.ceil(x), Math.ceil(y)); //to smallest integer which is =>
//> ceil:  3 -3
console.log('floor: ', Math.floor(x), Math.floor(y)); //to smallest integer which is =<
//> floor:  2 -4
console.log('round: ', Math.round(x), Math.round(y));
//> 2 -3
console.log('trunc: ', Math.trunc(x), Math.trunc(y));
//>  trunc:  2 -3

console.log('random: ', Math.random()); //return a random number between 0 and 1

console.log('trigonometry');
y = y/(Math.PI/180); // all calculations in radians, this will convert to degrees
console.log('sin:', Math.sin(x), Math.sin(y));
console.log('cos:', Math.cos(x), Math.cos(y));
console.log('tg:', Math.tan(x), Math.tan(y));
console.log('arctg:', Math.atan(x), Math.atan(y));
//> trigonometry
//> sin: 0.675463180551151 -0.9061625725969523
//>  cos: -0.7373937155412454 0.4229295355310068
//>  tg: -0.9160142896734107 -2.142585221576509
//>  arctg: 1.176005207095135 -1.5653422269644663

//---DATE
console.log('---DATE---');
// to create new:
// new Date(); if no args then Date return current system date
// new Date(value); 'value' - Integer, milliseconds from 1.1.1970 00:00:00
// new Date(dateString); 'dateString' - string in format for Date.parse(): YYYY-MM-DDTHH:mm:ss.sssZ
// new Date(year, month[, date[, hour[, minutes[, seconds[, milliseconds]]]]]);
var d = new Date();
console.log(d);
//> Fri Jan 09 2015 10:06:33 GMT+0300 (Belarus Standard Time)
d = new Date(140000);
console.log(d);
//> Thu Jan 01 1970 03:02:20 GMT+0300 (Belarus Standard Time)
d = new Date('2015-01-09T10:00:01+03:00');
console.log(d);
//> Fri Jan 09 2015 10:00:01 GMT+0300 (Belarus Standard Time)
console.log(Date.UTC(2015,0,9,10)); //returns milliseconds from 1970 to specified time
//> 1420797600000
console.log(Date.now()); //same as Date.UTC(), but for current moment
//> 1420787712947
console.log(Date.parse('2016-01-01T00:00')); //parse time-string and return milliseconds
//> 1451606400000

//get* (* = FullYear||Month||Date||Day||Hours||etc.) - return * in Date according to local time;
//getUTC* - according to universal time
console.log(d.getFullYear());
//> 2015
console.log(d.getHours(), d.getUTCHours());
//> 10 7
console.log(d.getTime()); //return milliseconds from 1970 to date
//> 1420786801000

console.log('Copy date to a new date obj:');
var d2 = new Date();
console.log(d, '-', d2);
//> Fri Jan 09 2015 10:00:01 GMT+0300 (Belarus Standard Time) "-" Fri Jan 09 2015 10:35:04 GMT+0300 (Belarus Standard Time)
d2.setTime(d.getTime());
console.log(d, '-', d2);
//> Fri Jan 09 2015 10:00:01 GMT+0300 (Belarus Standard Time) "-" Fri Jan 09 2015 10:00:01 GMT+0300 (Belarus Standard Time)

// fns return string of date in different formats
console.log(d.toISOString());
//>2015-01-09T07:00:01.000Z
console.log(d.toDateString());
//>  Fri Jan 09 2015
console.log(d.toUTCString());
//> Fri, 09 Jan 2015 07:00:01 GMT

//---REGEXP
console.log('REGEXP');

var reg = new RegExp(/\d[A-z]{1,}\s|\n/gi),
    str = '1qwe asd 2zxc 3rty fgh';
console.log(reg.test(str)); //test if there is match in 'str'
reg.lastIndex = 0; //when RegExp does smthng, it starts his work from 'lastIndex', and it's becomes shifted
var regResult = reg.exec(str);
console.log(regResult[0]); //return first match