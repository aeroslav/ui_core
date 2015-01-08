//---Data Types---

var str, nmb;

//--Undefined
console.log('UNDEFINED');

console.log('declared, but not inited vars\n',str, nmb); // variable is declarated, but no value specified
//> undefined undefined

function returnUndef(a){
    a++;
};
console.log('function, that returns nothing\n',returnUndef(1));
//> undefined
// if argument is declared in fn, but no value is passed to it - fn will return undefined too.

console.log('void', void (1+2*3)); // can be used for evaluating statements for their side-effects
//> undefined


//-hoisting
declare_below_inited_above = 'inited!'
console.log(declare_below_inited_below, declare_below_inited_above);
//> undefined "inited!"
var declare_below_inited_below = 'inited too!',
    declare_below_inited_above;
//thats because all vars declarations are hoisted to the top of current scope, but initializations is not


//--String
console.log('\nSTRINGS');

str = 'str qwe,rty uio,zxc';

//-substr(start[, length]) - returns substring from 'start' (first is 0) position; if 'start' < 0 - used as an index from the end of str (negative values not supported in JScript)
console.log(str.substr(4,7));
//> qwe,rty

//-substring(start[, finish]) - returns substring from postition 'start' to position 'finish'; if 'start'||'finish' is <0 or NaN - they counted as 0
console.log(str.substring(3,3));
//> 
console.log(str.substring(4,7));
//> qwe


//-split(delim[, limit]) - splits string by 'delim', returns array, cuts returned array to 'limit' length if needed
console.log(str.split(','));
//> ["str qwe", "rty uio", "zxc"]
console.log(str.split(' '));
//> ["str", "qwe,rty", "uio,zxc"]

//-match(regexp) - returns array of matched substrs, or null if no matches;
//-search(regexp) - says if the string matches regexp
//-if only first match needed - RegExp.exec()
str = '1qwe asd 2zxc 3rty fgh';
console.log(str.match(/\d[A-z]{1,}\s|\n/gi));
//>  ["1qwe ", "2zxc ", "3rty "]


//--Number
console.log('\nNUMBERS');

var nmb1 = 0, nmb2 = 1;

//There is no error in math operation in JS, but there is special values:
console.log(nmb2/nmb1);
//> Infinity
console.log(-1*nmb2/nmb1);
//> -Infinity

//-parseInt(str,base) - takes string and converts it to a integer value with 'base' numeral system, or return NaN;
// if face symbol that couldn't be parsed - return what is parsed before that
nmb1 = parseInt('16abc',10);
nmb2 = parseInt('0xabc',16);
console.log(nmb1, nmb2);
//> 16 2748

//-parseFloat(str) - parse str to a floating point value
nmb1 = parseFloat('12.34');
nmb2 = parseFloat('1e3');
console.log(nmb1,nmb2);
//> 12.34 1000

//-isFinite(val) - test 'val' to be a finite number
console.log(isFinite(1/0));
//> false
console.log(isFinite(10/10));
//> true