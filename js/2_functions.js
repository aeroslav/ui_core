//---FUNCTIONS AND SCOPES---
console.log('---FUNCTIONS---');

//--DEFINING FNS

//deprecated method, through Function obj
var fHi = new Function('name','return "Hi "+name'); //slow, because code evaluates when fn is being creating; scope is always global, no matter where it called
console.log(fHi('dude'));
//> Hi dude

//-fn defined, constructor assigned to var 'sum'
function sum(a,b){
    return a+b;
};
console.log(sum(1,1));
//> 2
console.log(sum.prototype.constructor);
//> function sum(a,b){
//>     return a+b;
//> }

//-fn expression of anonymous fn assigned to var 'fnMult'
var fnMult = function (a,b) {
    return a*b;
};
console.log(fnMult(2,2));
//> 4
console.log(fnMult.prototype.constructor);
//> function (a,b) {
//>     return a*b;
//> }

//anonimous fn, will execute right there and will be cleared
console.log(function (a,b){
    return a/b;
}(12,4));
//> 3

console.log('changing arguments');
var a = 1,
    obj = {
        prop: 3
    };
function changeExternalPrimitive(val){
    val = 'ext val changed';
}
console.log('before fn a == ', a);
changeExternalPrimitive(a);
console.log('after fn a == ', a);
//>  before fn a ==  1
//> after fn a ==  1

function changeExternalObj(valObj) {
    valObj.prop = 'ext obj prop changed';
}
console.log('before fn obj.prop == ', obj.prop);
changeExternalObj(obj);
console.log('after fn obj.prop == ', obj.prop);
//> before fn obj.prop ==  3
//> after fn obj.prop ==  ext obj prop changed

//--SCOPE
console.log('\nSCOPE');
var s = 'declared globally';
var b = (function scopeTest(){
    var s = 'declared in scopeTest', //redefine var s for inner fn scope
        s2 = 'declared in scopeTest';
    console.log('s inside scopeTest ==', s);
    //> s inside scopeTest == declared in scopeTest
    console.log('s2 inside scopeTest ==', s2);
    //> s2 inside scopeTest == declared in scopeTest

    function scopeTestInner(a) {
        console.log('s2 inside scopeTestInner ==', s2);
        //> s2 inside scopeTestInner == declared in scopeTest
        return a + ' --this added in scopeTestInner--';
    };
    console.log('scopeTestInner ==', scopeTestInner('passed argument'));
    //> scopeTestInner == passed argument --this added in scopeTestInner--

    var scopeTestOnlyInner = function (s) {
        return s + ' --this added in scopeTestOnlyInner--';
    };
    console.log('scopeTestOnlyInner ==', scopeTestOnlyInner('passed argument'));
    //> scopeTestOnlyInner == passed argument --this added in scopeTestOnlyInner--
    return scopeTestInner;
})();

//console.log('s2 ==', s2); - throw error 's2 is not defined'
//scopeTestInner(s); - error, this fn doesn't present in current scope

console.log('returned From Scope Test ==', b(s));
//> returnedFromScopeTest == declared globally --this added in scopeTestInner--

//--CLOSURE
console.log('\nCLOSURE');
function summator(startSum){
    var currentSum = startSum;
    return function(toSum) {
        return currentSum += toSum;
    }
};
var sum1 = summator(0);
console.log(sum1(10));
console.log(sum1(2));
//> 10
//> 12

var sum2 = summator(100);
console.log(sum2(1));
console.log(sum2(2));
//> 101
//> 103

//--apply, call, bind
console.log('\napply, call, bind');
var obj2 = {
    a: 1,
    b: 2,
    fn: function (arg) {
        return Math.pow(arg + this.a, this.b);
    }
};
var obj3 = {
    a: 2,
    b: 2
};
console.log( obj2.fn(1) );
//> 4
console.log( obj2.fn.call(obj3,1) ); //-call fn from obj2 for obj3 as this; call accepts a LIST of arguments
//> 9
console.log( obj2.fn.apply(obj3,[1]) ); //-apply(thisArg[, ArgsArray])
//> 9
var boundForObj3 = obj2.fn.bind(obj3); //-bind creates new fn with this set to its argument
console.log( boundForObj3(2) );
//> 16

//>---STRICT MODE---
console.log('\nSTRICT MODE');
function imStrict(a) { //arguments should have unique names
    'use strict';
    console.log('strict');

    //var implements, interface, let, package, private, protected, public, static, yield, class, enum, export, extends, import, super; //> Uncaught SyntaxError: Unexpected strict mode reserved word

    console.log('1. creating global var accidentally -', 'will cause error');
    //aVar = 'Accidentally I\'ve create a global variable.'; //> Uncaught ReferenceError: aVar is not defined

    Object.defineProperty(obj, 'dProp', {value: 42, writable: false});
    console.log('2. assign that should silently fail -','will throw error');
    //obj.dProp = 43; //> Uncaught TypeError: Cannot assign to read only property 'dProp' of #<Object>

    //delete Object.prototype; //> Uncaught TypeError: Cannot delete property 'prototype' of function Object() { [native code] }

    console.log('3. duplicated properties in object -', 'not allowed');
    //var objDup = { //object with duplicated properties
        //prop: 1,
        //prop: 2
    //};
    //> Uncaught SyntaxError: Duplicate data property in object literal not allowed in strict mode

    console.log('4. octal literals -', 'not allowed');
    //var octal = 015; //> Uncaught SyntaxError: Octal literals are not allowed in strict mode.

    console.log('5. \'this\' is NOT forced to be an object');
    function retThis(a) {
        //console.log(retThis.arguments); //> Uncaught TypeError: 'caller', 'callee', and 'arguments' properties may not be accessed on strict mode functions or the arguments objects for calls to them
        return this;
    }
    console.log(retThis.call(1)); //no boxing
    //> 1

    //if (true){
    //    function f() { console.log('f in if statement'); } //> Uncaught SyntaxError: In strict mode code, functions can only be declared at top level or immediately within another function.
    //    f();
    //}
};

function imNotStrict(a) { //arguments may have same names, but only last will be visible, others available with 'arguments[]'
    console.log('non-strict');

    var implements, interface, let, package, private, protected, public, static, yield; //ok for non-strict
    aVar = 'Accidentally I\'ve create a global variable.';
    console.log('1. creating global var accidentally -', aVar);
    //> 

    Object.defineProperty(obj, 'dProp', {value: 42, writable: false});
    obj.dProp = 43;
    console.log('2. assign that should silently fail -', 'just silent, obj.dProp ==' , obj.dProp);
    //> 2. assign that should silently fail - just silent, obj.dProp == 42

    delete Object.prototype; // silently fails

    console.log('3. duplicated properties in object -', 'no error, but only value of last duplicated properties has meaning');
    var objDup = { //object with duplicated properties
        prop: 1,
        prop: 2
    };
    console.log(objDup.prop); //> 2

    console.log('4. octal literals -', 'allowed');
    var octal = 015;

    console.log('5. \'this\' is forced to be an object');
    function retThis(a) {
        console.log(retThis.arguments); //> []
        return this;
    }
    console.log(retThis.call(1)); //boxing
    //>  Number {[[PrimitiveValue]]: 1}

    if (true){
        function f() { console.log('f in if statement'); } // ok for non-strict
        f(); //> f in if statement
    }
}

imStrict(1);
//> strict
//> 1. creating global var accidentally - will cause error
imNotStrict(1);
//> non-strict
//> 1. creating global var accidentally - Accidentally I've create a global variable.